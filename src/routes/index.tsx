import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { SignUp, Home } from "../pages";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <p>Not Found</p>,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
