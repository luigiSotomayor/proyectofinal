import Button from "./Button.jsx";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch.js";

const Menu = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [teamOfPlayer, setTeamOfPlayer] = useState({});
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const teamReq = await apiFetch(`http://localhost:3000/api/v1/team/team/${user._id}`);
        setTeamOfPlayer(teamReq);
        const matchesReq = await apiFetch(`http://localhost:3000/api/v1/match/team/${teamReq._id}`);
        setMatches(matchesReq);
      } catch (error) {
        console.error(error);
      }
    };

    loadMatches();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <div className="menu">
      <section className="logout">
        <Button type="button" text="Logout" onClick={handleSubmit} />
      </section>
      {user.role === "director deportivo" && (
        <section className="usuarios">
          <h2>Usuarios</h2>
        </section>
      )}
      {user.role === "director deportivo" && (
        <section className="equipos">
          <h2>Equipos</h2>
        </section>
      )}
      {user.role === "jugador" && (
        <section className="partidos">
          <h2>{matches.length} partidos</h2>
        </section>
      )}
    </div>
  );
};

export default Menu;
