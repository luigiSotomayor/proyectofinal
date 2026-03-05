import InfoUser from "./InfoUser.jsx";
import CreateUser from "./CreateUser.jsx";
import CreateTeam from "./CreateTeam.jsx";
import MatchDetails from "./MatchDetails.jsx";
import CreateMatch from "./CreateMatch.jsx";
import EditMatchDetails from "./EditMatchDetails.jsx";

const InfoData = ({ mode, selectedMatch }) => {
  return (
    <div>
      {mode === "usuario" && (<InfoUser />)}
      {mode === "usersdisplay" && (<CreateUser />)}
      {mode === "teamsdisplay" && (<CreateTeam />)}
      {mode === "matchdetails" && (<MatchDetails match={selectedMatch} />)}
      {mode === "editmatchdetails" && (<EditMatchDetails match={selectedMatch} />)}
      {mode === "creatematch" && (<CreateMatch />)}
    </div>
  );
};

export default InfoData;
