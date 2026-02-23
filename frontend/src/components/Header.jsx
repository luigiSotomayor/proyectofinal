import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="/images/stenellaSinFondo.png"
          alt="Logo del club"
          className="logo-wrapper"
          onClick={navigateToHome}
        />

        <img
          src="/images/stenellaSinFondo.png"
          alt="Logo del club"
          className="logo"
          onClick={navigateToHome}
        />
      </div>

      <h1 className="titleHeader" onClick={navigateToHome}>
        Stenella Club de Fútbol
      </h1>
    </header>
  );
};

export default Header;