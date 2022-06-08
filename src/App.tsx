import React from "react";

import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import Slidebar from "./components/Slidebar/Slidebar";
import { useAppSelector } from "./components/Redux/Store";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Show from "./components/Show/Show";
function App() {
  const logState: Boolean = useAppSelector((state) => state.auth.isLogin);

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Slidebar />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/show"
            element={logState === true ? <Show /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
