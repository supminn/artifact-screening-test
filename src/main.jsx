import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { UserList, UserProfile } from "./components";
import { UserDataProvider } from "./context/UserDataProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <UserList />,
  },
  {
    path: "/users/:userId",
    element: <UserProfile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserDataProvider>
    <RouterProvider router={router} />
  </UserDataProvider>
);
