import React from "react";
import SubHeader from "../components/SubHeader.jsx";
import Menu from "../components/Menu.jsx";
import InfoData from "../components/InfoData.jsx";
import { useState } from "react";
import "../styles/infodisplay.css";
import { MatchProvider } from "../context/MatchContext.jsx";

const InfoDisplay = () => {
  const [mode, setMode] = useState("usuario");
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <div className="infodisplay">
      <SubHeader />
      <section className="main-infodisplay">
        <MatchProvider>
          <Menu setMode={setMode} />
          <InfoData mode={mode} />
        </MatchProvider>
      </section>
    </div>
  );
};

export default InfoDisplay;
