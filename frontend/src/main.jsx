import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import Root from "./routes/Root"
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Division, { loader as divisionLoader } from "./routes/Division";
import NewCredential from "./routes/NewCredential"
import EditCredential from "./routes/EditCredential";

const router = createBrowserRouter([
  {
    path: "/",  
    element: <Root />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/division/:divisionId",
        loader: divisionLoader,
        element: <Division />,
      },
      {
        path: "/division/:divisionId/newCredential",
        element: <NewCredential />
      },
      {
        path: "/division/:divisionId/editCredential",
        element: <EditCredential />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
