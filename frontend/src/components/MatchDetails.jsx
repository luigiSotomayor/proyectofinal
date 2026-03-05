import React from "react";
import { formatDate } from "../utils/formatDate";
import "../styles/MatchDetails.css";

const MatchDetails = ({ match }) => {
  return (
    <>
      <div>{match.team.name}</div>
      <div>
        <p>Rival: {match.rival}</p>
        <p>Fecha: {formatDate(match.date)}</p>
        <p>Campo: {match.home === true ? "Local" : "Visitante"}</p>
      </div>
      <div>
        <p>Campeonato: {match.championship}</p>
        <p>Jornada: {match.jornada}</p>
      </div>
      <div>Estadísticas del partido: </div>
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
          {match.stats.map((stat) => (
            <tr key={stat.player._id}>
              <td>
                {stat.player.lastName}, {stat.player.firstName}
              </td>
              <td>{stat.titular ? '✅' : '❌'}</td>
              <td>{stat.minutes}</td>
              <td>{stat.yellowCards ? '✅' : '❌'}</td>
              <td>{stat.doubleYellowCards ? '✅' : '❌'}</td>
              <td>{stat.redCards ? '✅' : '❌'}</td>
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
