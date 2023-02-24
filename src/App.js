import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Root from "./pages/Root";
import SignUp from "./pages/SignUp";
import Upload from "./pages/Upload";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      // errorElement: <NotFound />,
      children: [
        { index: true, element: <Main /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "upload", element: <Upload /> },
        { path: "detail", element: <Detail /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
