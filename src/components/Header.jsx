import React from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const { signOut } = useClerk();
  const { user: clerkUser } = useUser();
  const reduxUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(removeUser()); // Clear Redux user state
      navigate("/");
    } catch (error) {
      console.log("Error Sign Out", error);
    }
  };

  // Check if user is signed in (either Clerk user or Redux user exists)
  const isUserSignedIn = clerkUser || reduxUser;

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-46 "
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />

      {isUserSignedIn && (
        <div className="flex p-2">
          <img
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            alt="usericon_logo"
            className="w-12 h-12"
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white cursor-pointer">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
