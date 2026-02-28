import React from "react";
import SubHeader from "../components/SubHeader.jsx";
import Menu from "../components/Menu.jsx";
import InfoData from "../components/InfoData.jsx";
import { useState } from "react";
import "../styles/infodisplay.css";

const InfoDisplay = () => {
  const [mode, setMode] = useState("usuario");
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <div className="infodisplay">
      <SubHeader />
      <section className="main-infodisplay">
        <Menu setMode={setMode} setSelectedMatch={setSelectedMatch} />
        <InfoData mode={mode} selectedMatch={selectedMatch} />
      </section>
    </div>
  );
};

export default InfoDisplay;
