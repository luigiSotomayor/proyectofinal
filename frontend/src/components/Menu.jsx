import Button from "./Button.jsx";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch.js";
import "../styles/Menu.css";

const Menu = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [teamOfPlayer, setTeamOfPlayer] = useState({});
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const teamReq = await apiFetch(
          `http://localhost:3000/api/v1/team/team/${user._id}`,
        );
        setTeamOfPlayer(teamReq);
        const matchesReq = await apiFetch(
          `http://localhost:3000/api/v1/match/team/${teamReq._id}`,
        );
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

  const formatDate = (date) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
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
          <h3>{teamOfPlayer.name}</h3>
          <ul className="matches-list">
            {matches.map((match) => (
              <li
                key={match._id}
                onClick={() => setSelectedMatch(match._id)}
                className="match-item"
              >
                {match.rival} - {formatDate(match.date)}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Menu;
