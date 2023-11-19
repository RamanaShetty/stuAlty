import { Link } from "react-router-dom";
import { useState } from "react";

const secondData = [
  { name: "Analog and Digital Electronics", link: "/and" },
  { name: "Computer Organization and Architecture", link: "/coa" },
  { name: "Database Management Systems", link: "/dbms" },
  { name: "Discrete Mathematics", link: "/dm" },
  { name: "Object Oriented Programming", link: "/oops" },
];

const thirdData = [
  { name: "Automata and Compiler Design", link: "/acd" },
  { name: "Artificial Intelligence", link: "/ai" },
  { name: "Computer Networks", link: "cn" },
  { name: "Operating System", link: "os" },
];

const navItem = (item) => {
  return (
    <>
      <li>
        <a href={item.link} className="sub-Link">
          {item.name}
        </a>
      </li>
    </>
  );
};
export const Key = "Okay";

export const Navbar = () => {
  const [secondToggle, setSecondToggle] = useState(false);
  const [thirdToggle, setThirdToggle] = useState(false);

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
          HAHA
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
              <ul>{secondData.map((item) => navItem(item))}</ul>
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
              <ul>{thirdData.map((item) => navItem(item))}</ul>
            </div>
          )}
        </li>
        <li className="main-li">
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
        </li>
      </ul>
      <button>LOGIN</button>
    </div>
  );
};
