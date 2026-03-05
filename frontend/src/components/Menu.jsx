import Button from "./Button.jsx";
import { useAuth } from "../context/AuthContext";
import { useMatch } from "../context/MatchContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch.js";
import "../styles/Menu.css";
import { formatDate } from "../utils/formatDate.js";
import InfoData from "./InfoData.jsx";

const Menu = ({ setMode }) => {
  const { logout, user } = useAuth();
  const { selectedMatch, setSelectedMatch, matches, setMatches } = useMatch();
  const navigate = useNavigate();
  const [teamOfPlayer, setTeamOfPlayer] = useState({});
  const [teamMister, setTeamMister] = useState([{}]);
  /* const [matchesTeam, setMatchesTeam] = useState([]); */
  const [allMatches, setAllMatches] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [allTeams, setAllTeams] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
          setAllTeams(allTeamsReq);
        }

        if (user?.role === "entrenador") {
          const teamMisterReq = await apiFetch(
            `http://localhost:3000/api/v1/team/coach/${user._id}`,
          );
          setTeamMister(teamMisterReq);
          let allMatches = [];
          for (const team of teamMisterReq) {
            const matches = await apiFetch(
              `http://localhost:3000/api/v1/match/team/${team._id}`,
            );
            allMatches = [...allMatches, ...matches];
          }
          setMatches(allMatches);
        }

        if (user?.role === "jugador") {
          const teamReq = await apiFetch(
            `http://localhost:3000/api/v1/team/user/${user._id}`,
          );
          setTeamOfPlayer(teamReq);
          const matchesTeamReq = await apiFetch(
            `http://localhost:3000/api/v1/match/team/${teamReq._id}`,
          );
          setMatches(matchesTeamReq);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadMatches();
  }, [refresh]);

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const toggleItem = (id) => {
    setRefresh((prev) => !prev);
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="menu">
      <section className="logout">
        <Button type="button" text="Logout" onClick={handleSubmit} />
      </section>
      {user.role === "director deportivo" && (
        <section className="opciones">
          <h3 className="itemHover" onClick={() => setMode("usersdisplay")}>
            Gestión de usuarios
          </h3>
          <h3 className="itemHover" onClick={() => setMode("teamsdisplay")}>
            Gestión de equipos
          </h3>
          <h3>Partidos</h3>
          <ul className="matches-list">
            {allTeams.map((team) => (
              <li key={team._id} className="itemH">
                <div
                  className="team-item itemHover"
                  onClick={() => toggleItem(team._id)}
                >
                  {team.name}
                </div>

                {openId === team._id && (
                  <ul className="submenu">
                    {allMatches
                      .filter((match) => match.team._id === team._id)
                      .map((match) => (
                        <li
                          key={match._id}
                          onClick={() => (
                            setSelectedMatch(match),
                            setMode("matchdetails")
                          )}
                          className="match-item itemHover"
                        >
                          {match.rival} - {formatDate(match.date)}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      {user.role === "entrenador" && (
        <section className="equipos">
          <h3 className="addMatch" onClick={() => setMode("creatematch")}>
            Añadir partido
          </h3>
          <h3>Partidos</h3>
          <ul className="list-teamMister">
            {teamMister.map((team) => (
              <li key={team._id} className="teams">
                <div
                  onClick={() => toggleItem(team._id)}
                  className="team-item itemHover"
                >
                  {team.name}
                </div>
                {openId === team._id && (
                  <ul className="submenu">
                    {matches
                      .filter((match) => match.team._id === team._id)
                      .map((match) => (
                        <li
                          className="matchByTeam itemHover"
                          key={match._id}
                          onClick={() => (
                            setSelectedMatch(match),
                            setMode("editmatchdetails")
                          )}
                        >
                          {match.rival} - {formatDate(match.date)}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      {user.role === "jugador" && (
        <section className="partidos">
          <h3>{teamOfPlayer.name}</h3>
          <ul className="matches-list">
            {matches.map((match) => (
              <li
                key={match._id}
                onClick={() => (
                  setSelectedMatch(match),
                  setMode("matchdetails")
                )}
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
