import { lazy } from "react";

const Register = lazy(() => import("@/pages/Auth/Register"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Brand = lazy(() => import("@/pages/Brand"));
const Category = lazy(() => import("@/pages/Category"));
const SubCategory = lazy(() => import("@/pages/SubCategory"));
const Product = lazy(() => import("@/pages/Product"));
const ProductForm = lazy(() => import("@/pages/Product/Form"));
const Color = lazy(() => import("@/pages/Color"));
const Setting = lazy(() => import("@/pages/Settings"));
const Specification = lazy(() => import("@/pages/Specification"));
const Charge = lazy(() => import("@/pages/Charge"));
export const ROUTES = {
  Register,
  Login,
  Dashboard,
  Brand,
  Category,
  SubCategory,
  Product,
  ProductForm,
  Color,
  Setting,
  Specification,
  Charge,
};
