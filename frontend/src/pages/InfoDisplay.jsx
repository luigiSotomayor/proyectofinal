import React from "react";
import SubHeader from "../components/SubHeader";
import Menu from "../components/Menu";
import InfoUser from "../components/InfoUser";

const InfoDisplay = () => {
  return (
    <div className="infodisplay">
      <SubHeader />
      <section className="main-infodisplay">
        <Menu />
        <InfoUser />
      </section>
    </div>
  );
};

export default InfoDisplay;
