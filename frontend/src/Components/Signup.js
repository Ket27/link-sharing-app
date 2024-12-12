import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("All entries not filled");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password not same as Confirm Password");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://yourlinks-rl9s.onrender.com/api/auth/signup",
        { name, email, password },
        config
      );

      if (data.message === "userExist") {
        toast.warning("User already registered");
        return;
      }

      if (data.message === "User Signed Up") {
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        console.log(JSON.stringify(data.data));
        dispatch(userActions.setUserDetails(data.data));
        navigate(`/yourlinks/addLinks+profiledetails/${data.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login-Container">
      <div className="Login-Logo">YourLinks</div>
      <div className="Login-box">
        <h2 className="Login">SignUp</h2>
        <p id="text-line">Let's get you started sharing your links!</p>
        <div className="Form">
          <div className="email">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              required
            />
          </div>
          <div className="email">
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="password">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmpassword"
              required
            />
          </div>
          <button onClick={submitHandler}>SignUp</button>
        </div>
        <p>
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
