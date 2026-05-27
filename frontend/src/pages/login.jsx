import { useState } from "react";
import axios from "axios";
import { useNavigate, Link }
from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/notes");

    } catch (error) {

      alert(
        error.response.data.message
      );

    }

  };

  return (

    <div className="container">

      <h1>Login</h1>

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

      <button onClick={login}>
        Login
      </button>

      <p>

        No account?

        <Link to="/register">
          Register
        </Link>

      </p>

    </div>

  );

}

export default Login;