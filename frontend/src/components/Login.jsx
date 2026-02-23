import { useState } from "react";
import React from "react";
import "../styles/Login.css";
import { toast } from "react-toastify";
import Button from "./Button";
import { set } from "mongoose";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      toast.error("Por favor, completa todos los campos.", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
      setEmail("");
      setPassword("");
      return;
    }

    setError("");

    console.log("Login con:", { email, password });

    fetch("http://localhost:3000/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        localStorage.setItem("token", data.token);


        if (!res.ok) {
          // Aquí entran los 400, 401, 500, etc.
          if (res.status === 400) {
            setError("Credenciales incorrectas");
            toast.error("Credenciales incorrectas", {
              position: "top-center",
              autoClose: 4000,
              theme: "colored",
            });
            setEmail("");
            setPassword("");
            setIsAuthenticated(false);
          }

          throw new Error(data.message || "Error en la petición");
        }
        setIsAuthenticated(true);

        return data;
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <p className="titleLogin">Iniciar Sesión</p>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <Button type="submit" text="Login" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Login;
