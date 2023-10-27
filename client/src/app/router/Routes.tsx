import { createBrowserRouter, RouteObject } from "react-router-dom";
import AlcoholDetails from "../../features/alcohols/AlcoholDetails";
import AlcoholsTable from "../../features/alcohols/AlcoholsTable";
import AgeVerificationPage from "../../features/home/AgeVerificationPage";
import HomePage from "../../features/home/HomePage";
import ReviewDashboard from "../../features/reviews/ReviewDashboard";
import ForgetPasswordForm from "../../features/account/ForgetPasswordForm";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import App from "../layout/App";
import ForgetPassword from "../../features/account/ForgetPassword";
import ResetPasswordForm from "../../features/account/ResetPassword";
import NotFound from "../../features/errors/NotFound";
import ReviewDetails from "../../features/reviews/ReviewDetails";
import ReviewForm from "../../features/reviews/ReviewForm";
import AlcoholForm from "../../features/alcohols/AlcoholForm";
import AdminDashboard from "../../features/admin/AdminDashboard";

export const publicRoutes: RouteObject[] = [
  { path: "login", element: <LoginForm /> },
  { path: "register", element: <RegisterForm /> },
  { path: "forgotPassword", element: <ForgetPasswordForm /> },
  { path: "forgotPasswordIns", element: <ForgetPassword /> },
  { path: "resetPassword/:token", element: <ResetPasswordForm /> },
  { path: "home", element: <HomePage /> },
  { path: "age-verification", element: <AgeVerificationPage /> },
];

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "alcohols", element: <AlcoholsTable /> },
      { path: "alcoholAdd", element: <AlcoholForm /> },
      { path: "alcohols/:id", element: <AlcoholDetails /> },
      { path: "reviews", element: <ReviewDashboard /> },
      { path: "reviewDetails/:id", element: <ReviewDetails /> },
      { path: "reviewDetailsAdd/:id", element: <ReviewForm /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  ...publicRoutes,
];

export const router = createBrowserRouter(routes);
