import { Form, Formik } from "formik";
import {
  Button,
  Dropdown,
  Form as SemanticForm,
  Header,
} from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import "./AlcoholForm.css";
import { router } from "../../app/router/Routes";
import { useParams } from "react-router-dom";
import { useAlcoholCreate } from "../../hooks/api/alcohols/useAlcoholCreate";
import { useTranslation } from "react-i18next";

const typeOptions = [
  { key: "whiskey", text: "Whiskey", value: "Whiskey" },
  { key: "vodka", text: "Vodka", value: "Vodka" },
  { key: "rum", text: "Rum", value: "Rum" },
  { key: "gin", text: "Gin", value: "Gin" },
  { key: "tequila", text: "Tequila", value: "Tequila" },
  { key: "brandy", text: "Brandy", value: "Brandy" },
  { key: "wine", text: "Wine", value: "Wine" },
  { key: "beer", text: "Beer", value: "Beer" },
  { key: "cider", text: "Cider", value: "Cider" },
  { key: "sake", text: "Sake", value: "Sake" },
];

export default function AlcoholForm() {
  const addCreateAlcohol = useAlcoholCreate();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("nameIsRequired")),
    description: Yup.string().required(t("descriptionIsRequired")),
    // image: Yup.string().url(t("invalidImageUrl")),
    type: Yup.string().required(t("typeIsRequired")),
    alcohol_percentage: Yup.number()
      .required(t("alcoholPercentageIsRequired"))
      .min(0, t("alcoholPercentageMin"))
      .max(100, t("alcoholPercentageMax")),
    age: Yup.number().required(t("ageIsRequired")),
    price: Yup.number().required(t("priceIsRequired")),
  });

  const handleAddAlcoholSubmit = async (values) => {
    try {
      const response = await addCreateAlcohol.mutateAsync(values);
      router.navigate(`/alcohols`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="review-container">
      <Header as="h2" color="teal" textAlign="center">
        {t("addReview")}
      </Header>
      <Formik
        initialValues={{
          name: "",
          description: "",
          image: "",
          type: "",
          alcohol_percentage: "",
          age: "",
          price: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddAlcoholSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="ui form" autoComplete="off">
            <SemanticForm.Field>
              <label>{t("name")}</label>
              <MyTextInput name="name" placeholder={t("name")} />
            </SemanticForm.Field>

            <SemanticForm.Field>
              <label>{t("description")}</label>
              <MyTextInput name="description" placeholder={t("description")} />
            </SemanticForm.Field>

            <SemanticForm.Field>
              <label>{t("iamgeUrl")}</label>
              <MyTextInput name="image" placeholder={t("iamgeUrl")} />
            </SemanticForm.Field>

            <SemanticForm.Field>
              <label>{t("type")}</label>
              <Dropdown
                name="type"
                placeholder={t("type")}
                selection
                options={typeOptions}
                value={values.type}
                onChange={(_, { value }) => setFieldValue("type", value)}
              />
            </SemanticForm.Field>

            <SemanticForm.Field>
              <label>{t("alcoholPercentage")}</label>
              <MyTextInput
                name="alcohol_percentage"
                type="number"
                placeholder={t("alcoholPercentage")}
              />
            </SemanticForm.Field>

            <SemanticForm.Field>
              <label>{t("age")}</label>
              <MyTextInput name="age" type="number" placeholder={t("age")} />
            </SemanticForm.Field>

            <SemanticForm.Field>
              <label>{t("price")}</label>
              <MyTextInput
                name="price"
                type="number"
                placeholder={t("price")}
              />
            </SemanticForm.Field>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                positive
                content={t("createAlcohol")}
                type="submit"
                fluid
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
