import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Register() {

  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const register = async () => {

    try {

      const res = await axios.post(
        "https://mern-notes-app-s1fc.onrender.com/register",
        {
          username,
          password
        }
      );

      alert(res.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error.response.data.message
      );

    }

  };

  return (

    <div className="container">

      <h1>Register</h1>

      <input
        placeholder="Username"
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={register}>
        Register
      </button>

      <p>

        Already have account?

        <Link to="/">
          Login
        </Link>

      </p>

    </div>

  );

}

export default Register;