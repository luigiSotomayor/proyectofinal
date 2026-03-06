import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import "../styles/CreateMatch.css";
import Button from "./Button.jsx";

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
      <p>
        Elija el equipo del que quiere generar un partido nuevo y complete los
        datos requeridos.
      </p>
      <form className="form-create-match" onSubmit={handleSubmit(onSubmit)}>
        <section className="section-create-match">
          <label>Equipo: </label>
          <select {...register("team")}>
            <option value="">Elige un equipo</option>
            {teamsMister.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </section>
        <section className="section-create-match">
          <label>Rival: </label>
          <input {...register("rival")} />
          <label>Fecha: </label>
          <input {...register("date")} type="date" />
        </section>
        <section className="section-create-match">
          <label>Campeonato: </label>
          <select {...register("championship")}>
            <option value="">Elige una competición</option>
            <option value="liga">Liga</option>
            <option value="copa">Copa</option>
            <option value="amistoso">Amistoso</option>
          </select>
          <label>Jornada: </label>
          <input {...register("jornada")} />
        </section>
        <section className="button-create-match">
          <Button type="submit" text="Guardar" />
        </section>
      </form>
    </>
  );
};

export default CreateMatch;
