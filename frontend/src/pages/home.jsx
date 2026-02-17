import React from "react";
import InfoClub from "../components/InfoClub";
import Login from "../components/Login";
import "../styles/home.css";

const home = () => {
  return (
    <div className="infoClub">
      <InfoClub />
      <Login />
    </div>
  );
};

export default home;
