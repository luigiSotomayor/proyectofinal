import React, { use } from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "./Button.jsx";
import "../styles/CreateTeam.css";

const CreateTeam = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [state, setState] = useState("create");
  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("token");

  const loadTeamsList = async () => {
    try {
      const listPlayers = await fetch(
        "http://localhost:3000/api/v1/user/role/jugador",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
        .then((res) => res.json())
        .then((data) => setPlayers(data));

      const listCoaches = await fetch(
        "http://localhost:3000/api/v1/user/role/entrenador",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
        .then((res) => res.json())
        .then((data) => setCoaches(data));

      const teamsList = await fetch("http://localhost:3000/api/v1/team", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setTeams(data));
    } catch (error) {
      console.error("Error al cargar equipos:", error);
      toast.error("Hubo un problema al cargar los equipos.", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    loadTeamsList();
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    const teamSelected = teams.find((t) => t._id === selectedId);
    if (teamSelected) {
      setState("edit");
      reset({
        name: teamSelected.name,
        coach: teamSelected.coach?._id || teamSelected.coach,
        players: teamSelected.players?.map((p) =>
          typeof p === "object" ? p._id : p,
        ),
      });
    }
  }, [selectedId, teams, reset]);

  const onSubmit = async (data) => {
    if (state === "create") {
      const response = await fetch("http://localhost:3000/api/v1/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const newTeam = await response.json();
      setTeams((prev) => [...prev, newTeam]);
      if (!response.ok) {
        throw new Error("Error al crear equipo");
      }
      await loadTeamsList();
      toast.info("Equipo creado con éxito.", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
    }
    if (state === "edit") {
      await fetch(`http://localhost:3000/api/v1/team/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      toast.info("Equipo actualizado con éxito.", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
    }
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/api/v1/team/${selectedId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTeams(teams.filter((t) => t._id !== selectedId));
    setSelectedId("");
    reset();
    toast.info("Equipo borrado con éxito.", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
  };

  const buttonCreateTeam = (e) => {
    e.preventDefault();
    setState("create");
    setSelectedId("");
    reset({
      name: "",
    });
  };

  return (
    <div className="create-team">
      <section className="create-team-header">
        <select
          className="selected-team"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Selecciona equipo</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>
        {state === "edit" && (
          <Button
            type="button"
            text="Crear Equipo"
            onClick={buttonCreateTeam}
          />
        )}
      </section>

      {state && (
        <form className="section-form" onSubmit={handleSubmit(onSubmit)}>
          <section className="form-subsection subsection-a">
            <div>
              <label>Nombre: </label>
              <input {...register("name")} />
            </div>
            <div>
              <label>Entrenador: </label>
              <select {...register("coach")}>
                <option value="">Selecciona entrenador</option>
                {coaches.map((coach) => (
                  <option key={coach._id} value={coach._id}>
                    {coach.lastName}, {coach.firstName}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <section className="form-subsection subsection-b">
            <label>Selecciona los jugadores: </label>
            <hr className="line" />
          </section>
          <section className="form-subsection subsection-c">
            {players.map((player) => (
              <div key={player._id}>
                <input
                  type="checkbox"
                  value={player._id}
                  {...register("players")}
                />
                {player.lastName}, {player.firstName}
              </div>
            ))}
          </section>
          <section className="form-subsection subsection-d">
            <Button type="submit" text="Guardar" />
            <Button type="button" text="Borrar" onClick={handleDelete} />
          </section>
        </form>
      )}
    </div>
  );
};

export default CreateTeam;
