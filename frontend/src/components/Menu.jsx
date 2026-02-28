import Button from "./Button.jsx";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch.js";
import "../styles/Menu.css";
import { formatDate } from "../utils/formatDate.js";
import SlimSelect from "slim-select";

const Menu = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [teamOfPlayer, setTeamOfPlayer] = useState({});
  const [teamMister, setTeamMister] = useState([{}]);
  const [matchesTeam, setMatchesTeam] = useState([]);
  const [allMatches, setAllMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [allTeams, setAllTeams] = useState([]);

  new SlimSelect({
    select: "#selectElement",
  });

  useEffect(() => {
    const loadMatches = async () => {
      try {
        if (user?.role === "director deportivo") {
          const allMatchesReq = await apiFetch(
            `http://localhost:3000/api/v1/match`,
          );
          setAllMatches(allMatchesReq);
          const allTeamsReq = await apiFetch(
            `http://localhost:3000/api/v1/team`,
          );
          console.log(allTeamsReq);
          setAllTeams(allTeamsReq);
        }

        if (user?.role === "entrenador") {
          const teamMisterReq = await apiFetch(
            `http://localhost:3000/api/v1/team/coach/${user._id}`,
          );
          setTeamMister(teamMisterReq);
          const matchesTeamMisterReq = await apiFetch(
            `http://localhost:3000/api/v1/match/team/${teamMisterReq[0]._id}`,
          );
          setMatchesTeam(matchesTeamMisterReq);
        }

        if (user?.role === "jugador") {
          const teamReq = await apiFetch(
            `http://localhost:3000/api/v1/team/user/${user._id}`,
          );
          setTeamOfPlayer(teamReq);
          const matchesTeamReq = await apiFetch(
            `http://localhost:3000/api/v1/match/team/${teamReq._id}`,
          );
          setMatchesTeam(matchesTeamReq);
        }
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

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
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
            <li className="itemHover">Altas</li>
            <li className="itemHover">Bajas</li>
            <li className="itemHover">Editar usuario</li>
          </ul>
          <h4>Gestión de equipos</h4>
          <ul className="gestion-equipos ulist-menu">
            <li className="itemHover">Altas</li>
            <li className="itemHover">Bajas</li>
            <li className="itemHover">Editar usuario</li>
          </ul>
          <h4>Partidos</h4>
          {allTeams.map((team) => (
            <div key={team._id}>
              <p className="teamName">{team.name}</p>
              <select id="single">
                {allMatches.map((match) => 
                  team._id === match.team._id && (
                    <option key={match._id} className="options" value={match._id}>
                      {match.rival} - {formatDate(match.date)}
                    </option>)
                )}
              </select>
            </div>
          ))}
        </section>
      )}
      {user.role === "entrenador" && (
        <section className="equipos">
          <h3 className="addMatch">Añadir partido</h3>
          <h3>Partidos</h3>
          {teamMister.map((team) => (
            <div key={team._id}>
              <p className="teamName">{team.name}</p>
              <select id="single">
                {matchesTeam.map((match) => 
                  team._id === match.team._id && (
                    <option key={match._id} className="options" value={match._id}>
                      {match.rival} - {formatDate(match.date)}
                    </option>)
                )}
              </select>
            </div>
          ))}
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
