import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const CreateMatch = () => {
  const [teamsMister, setTeamsMister] = useState([]);
  const { logout, user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    loadTeamsByCoach();
  }, []);

  const onSubmit = async (data) => {
    try {
      const newMatch = await fetch(`http://localhost:3000/api/v1/match`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      reset();
      await loadTeamsByCoach();
      alert("Partido creado");
    } catch (error) {
      console.error("Error al cargarse los partidos", error);
    }
  };

  return (
    <>
      <div>Elija el equipo del que quiere generar un partido nuevo: </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Equipo: </label>
        <select {...register("team")}>
          <option value="">Elige un equipo</option>
          {teamsMister.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>
        <label>Fecha: </label>
        <input {...register("date")} type="date" />
        <label>Campeonato: </label>
        <select {...register("championship")}>
          <option value="">Elige una competición</option>
          <option value="liga">Liga</option>
          <option value="copa">Copa</option>
          <option value="amistoso">Amistoso</option>
        </select>
        <label>Jornada: </label>
        <input {...register("jornada")} />
        <label>Rival: </label>
        <input {...register("rival")} />
        <button type="submit">Guardar partido</button>
      </form>
    </>
  );
};

export default CreateMatch;
