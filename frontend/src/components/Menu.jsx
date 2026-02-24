import React from "react";
import Button from "./Button.jsx";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <div className="menu">
      <section className="logout">
        <Button
          type="button"
          text="Logout"
          onClick={handleSubmit}
        />
      </section>
      <section className="usuarios">
        <h2>Usuarios</h2>
      </section>
      <section className="equipos">
        <h2>Equipos</h2>
      </section>
      <section className="partidos">
        <h2>Partidos</h2>
      </section>
    </div>
  );
};

export default Menu;
