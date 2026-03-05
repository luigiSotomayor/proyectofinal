import React from "react";
import { formatDate } from "../utils/formatDate.js";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { apiFetch } from "../utils/apiFetch.js";

const EditMatchDetails = ({ match }) => {
  const token = localStorage.getItem("token");
  const [teamPlayers, setTeamPlayers] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (match?.stats) {
      setValue("stats", match.stats);
    }
  }, [match, setValue]);

  useEffect(() => {
    const loadPlayers = async () => {
      const players = await apiFetch(
        `http://localhost:3000/api/v1/team/${match.team._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTeamPlayers(players.players);
    };

    if (match?.team?._id) {
      loadPlayers();
    }
  }, [match]);

  useEffect(() => {
    if (!teamPlayers.length) return;

    const initialStats = teamPlayers.map((player) => {
      const stat = match.stats?.find((s) => s.player._id === player._id);

      return {
        player: player._id,
        titular: stat?.titular || false,
        minutes: stat?.minutes || 0,
        yellowCards: stat?.yellowCards || false,
        doubleYellowCards: stat?.doubleYellowCards || false,
        redCards: stat?.redCards || false,
        goalsScored: stat?.goalsScored || 0,
        goalsConceded: stat?.goalsConceded || 0,
        rating: stat?.rating || 0,
      };
    });
    setValue("stats", initialStats);
  }, [teamPlayers, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/match/${match._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stats: data.stats }),
        },
      );

      if (!response.ok) throw new Error("Error guardando stats");

      alert("Estadísticas guardadas correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{match.team.name}</div>
        <div>
          <p>Rival: {match.rival}</p>
          <p>Fecha: {formatDate(match.date)}</p>
          <p>Campo: {match.home ? "Local" : "Visitante"}</p>
        </div>
        <div>
          <p>Campeonato: {match.championship}</p>
          <p>Jornada: {match.jornada}</p>
        </div>

        <table className="match-stats-table">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Titular</th>
              <th>Min</th>
              <th>T.A</th>
              <th>Doble A</th>
              <th>T.R</th>
              <th>Goles</th>
              <th>Encajados</th>
              <th>Nota</th>
            </tr>
          </thead>

          <tbody>
            {teamPlayers.map((player, index) => (
              <tr key={player._id}>
                <td>
                  {player.lastName}, {player.firstName}
                  <input
                    type="hidden"
                    value={player._id}
                    {...register(`stats.${index}.player`)}
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    {...register(`stats.${index}.titular`)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    {...register(`stats.${index}.minutes`)}
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    {...register(`stats.${index}.yellowCards`)}
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    {...register(`stats.${index}.doubleYellowCards`)}
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    {...register(`stats.${index}.redCards`)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    {...register(`stats.${index}.goalsScored`)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    {...register(`stats.${index}.goalsConceded`)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    step="0.1"
                    {...register(`stats.${index}.rating`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit">Guardar estadísticas</button>
      </form>
    </>
  );
};
export default EditMatchDetails;
