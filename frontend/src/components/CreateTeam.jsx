import React, { use } from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const CreateTeam = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [state, setState] = useState("create");
  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("token");

  useEffect(() => {
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
      }
    };
    loadTeamsList();
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    const teamSelected = teams.find((t) => t._id === selectedId);
    if (teamSelected) {
      setState("edit");
      reset({
        ...teamSelected,
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
      alert("Equipo creado");
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
      alert("Equipo actualizado");
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
    alert("Equipo eliminado");
  };

  return (
    <div className="create-team">
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Crear nuevo equipo</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>
      {state === "edit" && (
        <button
          type="button"
          onClick={() => {
            setState("create");
            setSelectedId("");
            reset({
              name: "",
            });
          }}
        >
          Crear nuevo equipo
        </button>
      )}

      {state && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nombre: </label>
          <input {...register("name")} />
          <select {...register("coach")}>
            <option value="">Selecciona entrenador</option>
            {coaches.map((coach) => (
              <option key={coach._id} value={coach._id}>
                {coach.firstName} {coach.lastName}
              </option>
            ))}
          </select>
          {players.map((player) => (
            <div key={player._id}>
              <input
                type="checkbox"
                value={player._id}
                {...register("players")}
              />
              {player.firstName} {player.lastName}
            </div>
          ))}
          <button type="submit">
            {state === "create" ? "Crear equipo" : "Guardar cambios"}
          </button>
          <button type="button" onClick={handleDelete}>
            Borrar equipo
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateTeam;
