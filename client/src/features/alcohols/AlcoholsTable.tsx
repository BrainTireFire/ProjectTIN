import {
  Card,
  Button,
  Icon,
  Image,
  Rating,
  Input,
  Select,
  Grid,
  Segment,
  Form as SemanticForm,
  Modal,
  Dropdown,
} from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useAlcoholsQuery } from "../../hooks/api/alcohols/useAlcoholsQuery";
import { Alcohol } from "../../app/models/alcohol";
import "./AlcoholsTable.css";
import ErrorPage from "../errors/ErrorPage";
import { useEffect, useState } from "react";
import { apiClient } from "../../app/api/agent";
import { useCurrentUser } from "../../hooks/api/users/useCurrentUser";
import { Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import * as Yup from "yup";
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

const options = [
  { key: 5, text: "5", value: 5 },
  { key: 10, text: "10", value: 10 },
  { key: 20, text: "20", value: 20 },
  { key: 30, text: "30", value: 30 },
  { key: 50, text: "50", value: 50 },
  { key: 100, text: "100", value: 100 },
];

export default function AlcoholsTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedAlcohol, setSelectedAlcohol] = useState(null);
  const alcoholsQuery = useAlcoholsQuery(page, pageSize);
  const currentUser = useCurrentUser();
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

  if (alcoholsQuery.error) {
    console.log(alcoholsQuery.error);
    return (
      <ErrorPage
        message={alcoholsQuery.error.response.data.message}
        statusText={alcoholsQuery.error.response.statusText}
      />
    );
  }

  if (alcoholsQuery.isLoading) {
    return <LoadingComponent content="Loading alcohols..." />;
  }

  const updateAlcohol = async (alcoholBody) => {
    setIsUpdating(true);
    try {
      const response = await apiClient.patch(
        `http://localhost:5000/api/v1/alcohols/${selectedAlcohol._id}`,
        alcoholBody
      );
      if (response.status === 200) {
        console.log("Alcohol updated successfully.");
        closeUpdateModal();
        alcoholsQuery.refetch();
      } else {
        console.error("Alcohol update failed. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while updating the user:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const countAverageRate = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }
    const sum = reviews.reduce(
      (total, review) => total + review.review.rating,
      0
    );
    const average = sum / reviews.length;
    return average;
  };

  const deleteAlcohol = async (alcoholId: string) => {
    setIsDeleting(true);
    try {
      const response = await apiClient.delete(
        `http://localhost:5000/api/v1/alcohols/${alcoholId}`
      );
      if (response.status === 204) {
        console.log("Review deleted successfully.");
      } else {
        console.error("Review deletion failed. Status:", response.status);
      }
      setTimeout(() => {
        setIsDeleting(false);
        alcoholsQuery.refetch();
      }, 500);
    } catch (error) {
      console.error("An error occurred while deleting the review:", error);
    }
  };

  const handleChange = (e, { value }) => {
    setPageSize(value);
  };

  const openUpdateModal = (alcohol) => {
    setSelectedAlcohol(alcohol);
    setIsUpdating(true);
  };

  const closeUpdateModal = () => {
    setSelectedAlcohol(null);
    setIsUpdating(false);
  };

  return (
    <div>
      <Segment>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>Limit:</p>
        <Select
          className="pagination-select-list"
          options={options}
          value={pageSize}
          onChange={handleChange}
          label="Items per page"
          labelPosition="right"
        />
        {(currentUser.data && currentUser.data?.role === "admin") ||
        currentUser.data?.role === "moderator" ? (
          <Link to={`/alcoholAdd`}>
            <Button color="blue">{t("addReview")}</Button>
          </Link>
        ) : null}
      </Segment>
      <Segment className="pagination_Container_Style">
        <div>
          <Button
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
            className="pagination-Button-Style"
          >
            {t("previous")}
          </Button>
          <span>
            {t("page")} {page}
          </span>
          <Button
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={alcoholsQuery.data?.alcohols.length < pageSize}
            className="pagination-Button-Style"
          >
            {t("next")}
          </Button>
        </div>
      </Segment>
      <Card.Group>
        {alcoholsQuery.data?.alcohols.map((alcohol: Alcohol) => (
          <Card key={alcohol._id}>
            <Link to={`/alcohols/${alcohol._id}`}>
              <Card>
                <Card.Content>
                  <Card.Header>{alcohol.name}</Card.Header>
                  <Card.Meta>
                    {t("type")}: {alcohol.type}
                  </Card.Meta>
                  <Image
                    src={alcohol.image}
                    alt={alcohol.name}
                    className="alcohol-image"
                    style={{ width: "250px", height: "300px" }}
                  />
                  <Card.Description>{alcohol.description}</Card.Description>
                </Card.Content>
              </Card>
            </Link>
            <Card.Content extra>
              <div>
                {t("type")}: {alcohol.age} years
              </div>
              <div>
                {t("alcoholPercentage")}: {alcohol.alcohol_percentage}%
              </div>
              <div>
                {t("price")}: ${alcohol.price.toFixed(2)}
              </div>
              {countAverageRate(alcohol.alcoholReviews) === 0 ? (
                <span className="no-rating"> No rating</span>
              ) : (
                <span>
                  {t("rating")}:
                  <Rating
                    icon="star"
                    rating={countAverageRate(alcohol.alcoholReviews)}
                    maxRating={10}
                    disabled
                  />
                </span>
              )}
            </Card.Content>
            <Card.Content extra>
              <Link to={`/reviewDetails/${alcohol._id}`}>
                <div className="ui buttons">
                  <Button basic color="blue">
                    <Icon name="edit" /> {t("review")}
                  </Button>
                </div>
              </Link>
              {(currentUser.data && currentUser.data?.role === "admin") ||
              currentUser.data?.role === "moderator" ? (
                <div className="ui buttons">
                  <p>{t("adminButtons")}:</p>
                  {currentUser.data?.role === "admin" ? (
                    <Button
                      onClick={() => deleteAlcohol(alcohol._id)}
                      color="red"
                    >
                      {t("delete")}
                    </Button>
                  ) : null}
                  <Button
                    onClick={() => openUpdateModal(alcohol)}
                    color="yellow"
                  >
                    {t("update")}
                  </Button>
                </div>
              ) : null}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      <Modal open={isUpdating} onClose={closeUpdateModal}>
        <Modal.Header>{t("updateUser")}</Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={{
              name: selectedAlcohol ? selectedAlcohol.name : "",
              description: selectedAlcohol ? selectedAlcohol.description : "",
              image: selectedAlcohol ? selectedAlcohol.image : "",
              type: selectedAlcohol ? selectedAlcohol.type : "",
              alcohol_percentage: selectedAlcohol
                ? selectedAlcohol.alcohol_percentage
                : "",
              age: selectedAlcohol ? selectedAlcohol.age : "",
              price: selectedAlcohol ? selectedAlcohol.price : "",
            }}
            validationSchema={validationSchema}
            onSubmit={updateAlcohol}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="ui form" autoComplete="off">
                <SemanticForm.Field>
                  <label>{t("name")}</label>
                  <MyTextInput name="name" placeholder={t("name")} />
                </SemanticForm.Field>

                <SemanticForm.Field>
                  <label>{t("description")}</label>
                  <MyTextInput
                    name="description"
                    placeholder={t("description")}
                  />
                </SemanticForm.Field>

                <SemanticForm.Field>
                  <label>{t("imageUrl")}</label>
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
                  <MyTextInput
                    name="age"
                    type="number"
                    placeholder={t("age")}
                  />
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
                ></div>
                <Button onClick={closeUpdateModal} negative>
                  {t("cancel")}
                </Button>
                <Button positive disabled={isSubmitting}>
                  {t("save")}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Content>
      </Modal>
    </div>
  );
}
