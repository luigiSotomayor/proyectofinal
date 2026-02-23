import React from "react";
import InfoClub from "../components/InfoClub";
import Login from "../components/Login";
import "../styles/home.css";

const home = ({ setIsAuthenticated }) => {
  return (
    <div className="mainHome">
      <InfoClub />
      <Login setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
};

export default home;
