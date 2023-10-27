import { Form, Formik } from "formik";
import { useState } from "react";
import {
  Button,
  Card,
  Form as SemanticForm,
  Header,
  Modal,
} from "semantic-ui-react";
import { apiClient } from "../../app/api/agent";
import MyTextInput from "../../app/common/form/MyTextInput";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useCurrentUser } from "../../hooks/api/users/useCurrentUser";
import { useUsersQuery } from "../../hooks/api/users/useUsersQuery";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersQuery = useUsersQuery();
  const currentUser = useCurrentUser();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("nameIsRequired")),
    email: Yup.string().email().required(t("emailIsRequired")),
    role: Yup.string()
      .required(t("roleIsRequired"))
      .oneOf([t("user"), t("moderator"), t("admin")], t("invalidRole")),
  });

  if (usersQuery.isLoading && currentUser.isLoading) {
    return <LoadingComponent content="Loading users..." />;
  }

  const updateUser = async (userBody) => {
    setIsUpdating(true);
    try {
      console.log(userBody);
      const response = await apiClient.patch(
        `http://localhost:5000/api/v1/users/${selectedUser._id}`,
        userBody
      );
      if (response.status === 200) {
        console.log("User updated successfully.");
        closeUpdateModal();
        usersQuery.refetch();
      } else {
        console.error("User update failed. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while updating the user:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteUser = async (userId) => {
    setIsDeleting(true);
    try {
      const response = await apiClient.delete(
        `http://localhost:5000/api/v1/users/${userId}`
      );
      if (response.status === 204) {
        console.log("User deleted successfully.");
      } else {
        console.error("Review deletion failed. Status:", response.status);
      }
      setTimeout(() => {
        setIsDeleting(false);
        usersQuery.refetch();
      }, 500);
    } catch (error) {
      console.error("An error occurred while deleting the review:", error);
    }
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdating(true);
  };

  const closeUpdateModal = () => {
    setSelectedUser(null);
    setIsUpdating(false);
  };

  return (
    <>
      {currentUser.data && currentUser.data?.role === "admin" ? (
        <div>
          <Header as="h2">Users</Header>
          {usersQuery.data?.users.length > 0 ? (
            usersQuery.data?.users.map((user) => (
              <Card key={user._id} className="review-card">
                <Card.Content>
                  <Card.Header>{user.name}</Card.Header>
                  <Card.Meta>
                    {t("email")}: {user.email}
                  </Card.Meta>
                  <Card.Meta>
                    {t("role")}: {user.role}
                  </Card.Meta>

                  <Button onClick={() => deleteUser(user._id)} color="red">
                    {t("delete")}
                  </Button>
                  <Button onClick={() => openUpdateModal(user)} color="yellow">
                    {t("update")}
                  </Button>
                </Card.Content>
              </Card>
            ))
          ) : (
            <p>{t("noUserAvailabe")}</p>
          )}
        </div>
      ) : (
        <p>Mhhhhhhhhhhhhhhhhhhh, Error? :)</p>
      )}

      <Modal open={isUpdating} onClose={closeUpdateModal}>
        <Modal.Header>{t("updateUser")}</Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={{
              name: selectedUser ? selectedUser.name : "",
              email: selectedUser ? selectedUser.email : "",
              role: selectedUser ? selectedUser.role : "",
            }}
            validationSchema={validationSchema}
            onSubmit={updateUser}
          >
            {({ isSubmitting }) => (
              <Form className="ui form" autoComplete="off">
                <SemanticForm.Field>
                  <label>{t("name")}</label>
                  <MyTextInput name="name" placeholder={t("name")} />
                </SemanticForm.Field>

                <SemanticForm.Field>
                  <label>{t("role")}</label>
                  <MyTextInput name="role" placeholder={t("role")} />
                </SemanticForm.Field>

                <SemanticForm.Field>
                  <label>{t("email")}</label>
                  <MyTextInput name="email" placeholder={t("email")} />
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
    </>
  );
}
