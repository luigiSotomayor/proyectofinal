import React from "react";
import { formatDate } from "../utils/formatDate";
import "../styles/MatchDetails.css";
import { useMatch } from "../context/MatchContext.jsx";

const MatchDetails = () => {
  const { setSelectedMatch, selectedMatch, setMatches, matches } = useMatch();
  return (
    <>
      <section className="team-name">{selectedMatch.team.name}</section>
      <section className="primary-match-data match-data">
        <p className="labelData">
          Rival: <span className="valueData">{selectedMatch.rival}</span>
        </p>
        <p className="labelData">
          Fecha:{" "}
          <span className="valueData">{formatDate(selectedMatch.date)}</span>
        </p>
      </section>
      <section className="secundary-match-data match-data">
        <p className="labelData">
          Campo:{" "}
          <span className="valueData">
            {selectedMatch.home === true ? "Local" : "Visitante"}
          </span>
        </p>
        <p className="labelData">
          Campeonato:{" "}
          <span className="valueData">{selectedMatch.championship}</span>
        </p>
        <p className="labelData">
          Jornada: <span className="valueData">{selectedMatch.jornada}</span>
        </p>
      </section>
      <section className="table-title">Estadísticas del partido: </section>
      <table className="match-stats-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Titular</th>
            <th>Min.Jug.</th>
            <th>T.A.</th>
            <th>Doble A.</th>
            <th>T.R.</th>
            <th>Goles Marcados</th>
            <th>Goles encajados</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {selectedMatch.stats
            .filter((stat) => stat.player)
            .map((stat) => (
              <tr key={stat.player._id}>
                <td>
                  {stat.player?.lastName}, {stat.player.firstName}
                </td>
                <td>{stat.titular ? "✅" : "❌"}</td>
                <td>{stat.minutes}</td>
                <td>{stat.yellowCards ? "✅" : "❌"}</td>
                <td>{stat.doubleYellowCards ? "✅" : "❌"}</td>
                <td>{stat.redCards ? "✅" : "❌"}</td>
                <td>{stat.goalsScored}</td>
                <td>{stat.goalsConceded}</td>
                <td>{stat.rating}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default MatchDetails;
