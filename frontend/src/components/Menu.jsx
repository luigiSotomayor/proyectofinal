import Button from "./Button.jsx";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch.js";
import "../styles/Menu.css";
import { formatDate } from "../utils/formatDate.js";

const Menu = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [teamOfPlayer, setTeamOfPlayer] = useState({});
  const [matchesTeam, setMatchesTeam] = useState([]);
  const [allMatches, setAllMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const allMatchesReq = await apiFetch(
          `http://localhost:3000/api/v1/match`,
        );
        setAllMatches(allMatchesReq);

        if (user?.role === "jugador") {
        const teamReq = await apiFetch(
          `http://localhost:3000/api/v1/team/team/${user._id}`,
        );
        setTeamOfPlayer(teamReq);
        const matchesTeamReq = await apiFetch(
          `http://localhost:3000/api/v1/match/team/${teamReq._id}`,
        );
        setMatchesTeam(matchesTeamReq);}
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
        <section className="opciones">
          <h4>Gestión de usuarios</h4>
          <ul className="gestion-usuarios ulist-menu">
            <li>Altas</li>
            <li>Bajas</li>
            <li>Editar usuario</li>
          </ul>
          <h4>Gestión de equipos</h4>
          <ul className="gestion-equipos ulist-menu">
            <li>Altas</li>
            <li>Bajas</li>
            <li>Editar usuario</li>
          </ul>
          <h4>Partidos</h4>
          <ul className="matches-list">
            {allMatches.map((match) => (
              <li
                key={match._id}
                onClick={() => setSelectedMatch(match._id)}
                className="match-item"
              >
                {match.team.name} - {formatDate(match.date)}
              </li>
            ))}
          </ul>
        </section>
      )}
      {user.role === "entrenador" && (
        <section className="equipos">
          <h2>crear partido</h2>
          <h2>Equipos con partidos</h2>
        </section>
      )}
      {user.role === "jugador" && (
        <section className="partidos">
          <h3>{teamOfPlayer.name}</h3>
          <ul className="matches-list">
            {matchesTeam.map((match) => (
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
