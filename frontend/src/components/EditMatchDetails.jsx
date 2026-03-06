import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { apiFetch } from "../utils/apiFetch.js";
import { useMatch } from "../context/MatchContext.jsx";
import { toast } from "react-toastify";
import "../styles/EditMatchDetails.css";
import Button from "./Button.jsx";

const EditMatchDetails = () => {
  const { setSelectedMatch, selectedMatch, setMatches, matches } = useMatch();
  const token = localStorage.getItem("token");

  const [teamPlayers, setTeamPlayers] = useState([]);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    const loadPlayers = async () => {
      const players = await apiFetch(
        `http://localhost:3000/api/v1/team/${selectedMatch.team._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTeamPlayers(players.players);
    };

    if (selectedMatch?.team?._id) {
      loadPlayers();
    }
  }, [selectedMatch]);

  useEffect(() => {
    if (!teamPlayers.length) return;

    const initialStats = teamPlayers.map((player) => {
      const stat = selectedMatch.stats?.find(
        (s) => s.player?._id === player._id,
      );

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

    reset({
      rival: selectedMatch.rival,
      date: selectedMatch.date?.slice(0, 10),
      home: selectedMatch.home,
      championship: selectedMatch.championship,
      jornada: selectedMatch.jornada,
      stats: initialStats,
    });
  }, [teamPlayers, selectedMatch, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/match/${selectedMatch._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rival: data.rival,
            date: data.date,
            home: data.home,
            championship: data.championship,
            jornada: data.jornada,
            stats: data.stats,
          }),
        },
      );
      const newMatch = await response.json();
      if (!response.ok) throw new Error("Error guardando partido");
      console.log("New match: ", newMatch);
      setSelectedMatch(newMatch);
      setMatches((prev) =>
        prev.map((m) => (m._id === newMatch._id ? newMatch : m)),
      );
      toast.info("Partido actualizado con éxito.", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="team-name">{selectedMatch.team.name}</section>
      <form className="form-edit-match" onSubmit={handleSubmit(onSubmit)}>
        <section className="section-edit-match">
          <label>Rival:</label>
          <input {...register("rival")} />
          <label>Fecha:</label>
          <input type="date" {...register("date")} />
        </section>
        <section className="section-edit-match">
          <label>Campo:</label>
          <select {...register("home", { setValueAs: (v) => v === "true" })}>
            <option value="true">Local</option>
            <option value="false">Visitante</option>
          </select>
          <label>Campeonato:</label>
          <select {...register("championship")}>
            <option value={"liga"}>Liga</option>
            <option value={"copa"}>Copa</option>
            <option value={"amistoso"}>Amistoso</option>
          </select>
          <label>Jornada:</label>
          <input type="number" {...register("jornada")} />
        </section>

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
                    className="inputTdNumbers"
                    type="number"
                    {...register(`stats.${index}.minutes`, {
                      valueAsNumber: true,
                    })}
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
                    className="inputTdNumbers"
                    type="number"
                    {...register(`stats.${index}.goalsScored`, {
                      valueAsNumber: true,
                    })}
                  />
                </td>

                <td>
                  <input
                    className="inputTdNumbers"
                    type="number"
                    {...register(`stats.${index}.goalsConceded`, {
                      valueAsNumber: true,
                    })}
                  />
                </td>

                <td>
                  <input
                    className="inputTdNumbers"
                    type="number"
                    step="0.1"
                    {...register(`stats.${index}.rating`, {
                      valueAsNumber: true,
                    })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="button-edit-match">
          <Button type="submit" text="Guardar" />
        </section>
      </form>
    </>
  );
};
export default EditMatchDetails;
