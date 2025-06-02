import React from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constant";

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
      <img className="w-46 " src={LOGO} alt="logo" />

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
