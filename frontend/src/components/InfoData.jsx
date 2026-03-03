import React from "react";
import InfoUser from "./InfoUser.jsx";
import CreateUser from "./CreateUser.jsx";
import DeleteUser from "./DeleteUser.jsx";
import EditUser from "./EditUser.jsx";
import CreateTeam from "./CreateTeam.jsx";
import DeleteTeam from "./DeleteTeam.jsx";
import EditTeam from "./EditTeam.jsx";
import MatchDetails from "./MatchDetails.jsx";
import CreateMatch from "./CreateMatch.jsx";

const InfoData = ({ mode, selectedMatch }) => {
  return (
    <div>
      {mode === "usuario" && (<InfoUser />)}
      {mode === "usersdisplay" && (<CreateUser />)}
      {mode === "teamsdisplay" && (<CreateTeam />)}
      {mode === "matchdetails" && (<MatchDetails match={selectedMatch} />)}
      {mode === "creatematch" && (<CreateMatch />)}
    </div>
  );
};

export default InfoData;
