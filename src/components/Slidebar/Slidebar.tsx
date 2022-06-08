import React from "react";
import "./Slidebar.css";
import { MdOutlineInsertComment } from "react-icons/md";
import { BsDisplay } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";
import { useAppDispatch, authAction, useAppSelector } from "../Redux/Store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Slidebar = () => {
  const logState: Boolean = useAppSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logout = (): void => {
    dispatch(authAction.logout());
    navigate("/");
  };
  return (
    <div className="Slidebar">
      <ul className="list">
        <li className="list_info">
          <MdOutlineInsertComment />
          <p>Insert Todo</p>
        </li>

        <li className="list_info">
          <BsDisplay />
          <p>Show Todo</p>
        </li>

        {logState === true ? (
          <li onClick={logout} className="list_info">
            <AiOutlineLogin />
            <p>Logout</p>
          </li>
        ) : (
          <li className="list_info">
            <AiOutlineLogin />
            <p>Login</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Slidebar;
