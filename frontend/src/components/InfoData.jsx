import InfoUser from "./InfoUser.jsx";
import CreateUser from "./CreateUser.jsx";
import CreateTeam from "./CreateTeam.jsx";
import MatchDetails from "./MatchDetails.jsx";
import CreateMatch from "./CreateMatch.jsx";
import EditMatchDetails from "./EditMatchDetails.jsx";
import { useMatch } from "../context/MatchContext.jsx";

const InfoData = ({ mode }) => {
  const { selectedMatch } = useMatch();

  return (
    <div>
      {mode === "usuario" && <InfoUser />}
      {mode === "usersdisplay" && <CreateUser />}
      {mode === "teamsdisplay" && <CreateTeam />}
      {mode === "matchdetails" && <MatchDetails />}
      {mode === "editmatchdetails" && <EditMatchDetails />}
      {mode === "creatematch" && <CreateMatch />}
    </div>
  );
};

export default InfoData;
