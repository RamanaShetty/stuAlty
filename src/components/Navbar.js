import { Link } from "react-router-dom";
import { useState } from "react";
import { secondData, thirdData } from "../data";
import { NavItem } from "./NavItem";
import { Login } from "./login";
import { auth } from "../configuration/firebaseConfig";
import { AfterLogin } from "./afterLogin";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navbar = () => {
  const [secondToggle, setSecondToggle] = useState(false);
  const [thirdToggle, setThirdToggle] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <div className="nav-bar">
      <h2>
        <Link
          to="/"
          className="home-Link"
          onClick={() => {
            setSecondToggle(false);
            setThirdToggle(false);
          }}
        >
          stu<span>A</span>lty
        </Link>
      </h2>
      <ul className="main-ul">
        <li className="main-li">
          <button
            onClick={() => {
              setSecondToggle(!secondToggle);
              if (thirdToggle) setThirdToggle(!thirdToggle);
            }}
          >
            2nd yr
          </button>
          {secondToggle && (
            <div className="drop-down">
              <ul>{secondData.map((item) => NavItem(item))}</ul>
            </div>
          )}
        </li>
        <li className="main-li">
          <button
            onClick={() => {
              setThirdToggle(!thirdToggle);
              if (secondToggle) setSecondToggle(!secondToggle);
            }}
          >
            3rd yr
          </button>
          {thirdToggle && (
            <div className="drop-down">
              <ul>{thirdData.map((item) => NavItem(item))}</ul>
            </div>
          )}
        </li>
        {/* <li className="main-li">
          <Link
            to="/datastructures"
            className="main-Link"
            onClick={() => {
              setSecondToggle(false);
              setThirdToggle(false);
            }}
          >
            DSA
          </Link>
        </li> */}
      </ul>
      {user ? <AfterLogin /> : <Login />}
    </div>
  );
};
