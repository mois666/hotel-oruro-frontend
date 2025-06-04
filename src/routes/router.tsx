import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AuhtLayout, NavbarLayout } from "../layouts";
import {
  Login,
  Welcome,
  ErrorPage,
  HomeIndex,
  PrivacyPage,
  TermsPage,

} from "../pages";
import { Layout } from "../layouts/layout";
import ProtectedRoute from "./protected-routes";

import {
  IndexUsers,
  SettingsPage,
  Terms,
  ShowUsers,
  IndexClients,
  ShowClients,
  IndexRooms,

} from "../pages/admin";
import GuestRegistration from "../pages/admin/clients/GuestRegistration";
import GuestsPage from "../pages/admin/clients/GuestList";



//instanciar usuarios roles y permisos
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      //Routes not-auth landing page
      {
        element: <NavbarLayout />,
        children: [
          {
            path: "/",
            element: <Welcome />,
            errorElement: <ErrorPage />, // Página 404
          },

          {
            path: "/privacidad",
            element: <PrivacyPage />,
          },
          {
            path: "/terminos",
            element: <TermsPage />,
          },

        ],

      },
      //Routes shop page
      {
        path: "tienda",
        element: <NavbarLayout />,
        children: [
          {
            path: "",
            element: <Welcome />,
            errorElement: <ErrorPage />, // Página 404
          },
         
        ],
      },

      //Routes auth Admin page

      {
        path: "admin",
        element: <Layout />,
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <HomeIndex />
              </ProtectedRoute>
            ),
          },
          {
            path: "registro",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <GuestRegistration />
              </ProtectedRoute>
            ),
          },
          {
            path: "users",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexUsers />
              </ProtectedRoute>
            ),
          },
          {
            path: "users/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <ShowUsers />
              </ProtectedRoute>
            ),
          },
          {
            path: "huespedes",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <GuestsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "huespedes/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <ShowClients />
              </ProtectedRoute>
            ),
          },
          /* habitaciones */
          {
            path: "habitaciones",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexRooms />
              </ProtectedRoute>
            ),
          },
          
          /* brands */
         

          /* orders */

         
          {
            path: "company-terms/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <Terms />
              </ProtectedRoute>
            ),
          },

          {
            path: "ajustes",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <SettingsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  //Rutas auth
  {
    path: "login",
    element: <AuhtLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },

]);
export default router;
