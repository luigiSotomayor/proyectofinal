import React from "react";
import SubHeader from "../components/SubHeader.jsx";
import Menu from "../components/Menu.jsx";
import InfoData from "../components/InfoData.jsx";
import "../styles/infodisplay.css";

const InfoDisplay = () => {
  return (
    <div className="infodisplay">
      <SubHeader />
      <section className="main-infodisplay">
        <Menu />
        <InfoData />
      </section>
    </div>
  );
};

export default InfoDisplay;
