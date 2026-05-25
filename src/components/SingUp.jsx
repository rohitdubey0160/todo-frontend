import React, { useEffect } from "react";
import { useState } from "react";
import "../style/addTask.css";
import { Link } from "react-router-dom";
import "../style/App.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("signup")) {
      navigate("/");
    }
  });

  const handleSignUp = async () => {
    console.log(userData);
    let result = await fetch("https://todo-backend-zbej.onrender.com/signup", {
      method: "post",
      body: JSON.stringify(userData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.success) {
      localStorage.setItem("signup", userData.email);
     
      navigate("/");
    } else {
      alert("Try after some time");
    }
  };

  return (
    <div className="container">
      <h1>SignUp</h1>

      <label htmlFor="">Name</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, name: event.target.value })
        }
        type="text"
        id="name"
        name="name"
      />
      <br />
      <label htmlFor="">Email</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, email: event.target.value })
        }
        type="email"
        id="email"
        name="email"
      />
      <br />
      <label htmlFor="">Password</label>
      <input
        onChange={(event) =>
          setUserData({ ...userData, password: event.target.value })
        }
        type="password"
        id="password"
        name="password"
      />
      <br />
      <button id="btn" onClick={handleSignUp}>
        SignUp
      </button>
      <Link className="link" to="/login">
        Login
      </Link>
    </div>
  );
}

export default SignUp;
