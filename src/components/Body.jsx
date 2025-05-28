import React, { useEffect } from "react";
import {
  createBrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { addUser } from "../utils/userSlice";

const NavigationHandler = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const reduxUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoaded) {
      if (clerkUser && !reduxUser) {
        // User is authenticated in Clerk, dispatch to Redux
        dispatch(
          addUser({
            id: clerkUser.id,
            email: clerkUser.primaryEmailAddress?.emailAddress,
            fullName: clerkUser.fullName,
          })
        );
      }

      if (clerkUser && location.pathname === "/") {
        // User is authenticated and on login page, redirect to browse
        navigate("/browse");
      } else if (!clerkUser && location.pathname === "/browse") {
        // User is not authenticated and on browse page, redirect to login
        navigate("/");
      }
    }
  }, [clerkUser, reduxUser, isLoaded, dispatch, navigate, location.pathname]);

  return null;
};

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavigationHandler />
          <Login />
        </>
      ),
    },
    {
      path: "/browse",
      element: (
        <>
          <NavigationHandler />
          <Browse />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
