import React, { useState } from "react";
import "./Login.css";
import { useAppDispatch, authAction, useAppSelector } from "../Redux/Store";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = (): void => {
    dispatch(authAction.login());

    navigate("show");
  };

  return (
    <div className="Login">
      <div className="login_form">
        <div className="title">
          <h1>Login</h1>
        </div>
        <div className="line">
          <hr />
        </div>
        <div className="username">
          <input type="text" placeholder="Enter Username" />
        </div>
        <div className="username">
          <input type="text" placeholder="Enter Your Password" />
        </div>

        <div className="submitLogin">
          <button className="login_btn" onClick={submit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
