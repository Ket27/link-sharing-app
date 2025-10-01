import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (!email || !password) {
      toast.warning("All entries not filled");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      if (data.message === "User Logged in") {
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        console.log(JSON.stringify(data.data));
        dispatch(userActions.setUserDetails(data.data));
        navigate(`/yourlinks/addLinks+profiledetails/${data.data._id}`);
      } else if (data.message === "password not same") {
        toast.error("Password not same");
      } else if (data.message === "no user found") {
        toast.error("No user found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login-Container">
      <div className="Login-Logo">YourLinks</div>
      <div className="Login-box">
        <h2 className="Login">Login</h2>
        <p id="text-line"> Add your details below to get into the app</p>
        <div className="Form">
          <div className="email">
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              required
            />
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>
          <button onClick={submitHandler}>Login</button>
        </div>
        <p>
          Don't have an account?{" "}
          <Link to="/Signup" style={{ textDecoration: "none", color: "blue" }}>
            Create account
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
