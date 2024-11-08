import LayoutWrapper from "@/layouts";
import { Center } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";

const authRoutes = [
  {
    path: "/login",
    element: <ROUTES.Login />,
  },
  {
    path: "/register",
    element: <ROUTES.Register />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

const appRoutes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <ROUTES.Dashboard />,
      },
      {
        path: "/master",
        element: <Outlet />,
        children: [
          {
            path: "category",
            element: <ROUTES.Category />,
          },
          {
            path: "specification",
            element: <ROUTES.Specification />,
          },
          {
            path: "brand",
            element: <ROUTES.Brand />,
          },
          {
            path: "sub-category",
            element: <ROUTES.SubCategory />,
          },
          // {
          //   path: "sub-category/trashed",
          //   element: <ROUTES.TrashedSubCategory />,
          // },
          {
            path: "color",
            element: <ROUTES.Color />,
          },
        ],
      },
      {
        path: "/product",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ROUTES.Product />,
          },
          {
            path: "add",
            element: <ROUTES.ProductForm />,
          },
        ],
      },
      {
        path: "/settings",
        element: <ROUTES.Setting />,
      },
      {
        path: "*",
        element: (
          <Center h={"80dvh"} w={"80dvw"}>
            404
          </Center>
        ),
      },
    ],
  },
];

export { appRoutes, authRoutes };
