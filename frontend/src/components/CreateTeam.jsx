import React from 'react'
import { useForm } from "react-hook-form";

const CreateTeam = () => {
  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/team", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Respuesta del servidor:", response);
      if (!response.ok) {
        throw new Error("Error al crear equipo");
      }

      const result = await response.json();
      console.log("Equipo creado:", result);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-team">
      <h2>Crear Equipo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Nombre del equipo" />
        <input {...register("coach")} placeholder="Entrenador" />
        <button type="submit">Crear Equipo</button>
      </form>
    </div>
  )
}

export default CreateTeam