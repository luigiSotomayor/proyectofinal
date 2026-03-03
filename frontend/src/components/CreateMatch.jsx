import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const CreateMatch = () => {
  const [teamsMister, setTeamsMister] = useState([]);
  const { logout, user } = useAuth();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const loadTeamsByCoach = async (data) => {
      const listTeams = await fetch(
        `http://localhost:3000/api/v1/team/coach/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
        .then((res) => res.json())
        .then((data) => setTeamsMister(data));
    };
  }, []);

  const onSubmit = async () => {
    try {
      const listTeams = await fetch(
        `http://localhost:3000/api/v1/team/coach/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error("Error al cargarse los partidos", error);
    }
  };

  return (
    <>
      <div>Elija el equipo del que quiere generar un partido nuevo: </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Equipo: </label>
        <select>
          <option value="">Elige un equipo</option>
          {teamsMister.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>
        <label>Fecha: </label>
        <input {...register("date")} />
        <label>Campeonato: </label>
        <input {...register("championship")} />
        <label>Jornada: </label>
        <input {...register("jornada")} />
        <label>Rival: </label>
        <input {...register("rival")} />
      </form>
    </>
  );
};

export default CreateMatch;
