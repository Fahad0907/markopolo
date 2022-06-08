import React from "react";
import "./Nav.css";
import { BiTask } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav_title">
        <h3 className="nav_title_info">Markopolo Task</h3>
        <BiTask />
      </div>

      <div className="nav_name">
        <BsFillPersonFill />
        <h3>Mr. Fahad</h3>
      </div>
    </nav>
  );
};

export default Nav;
