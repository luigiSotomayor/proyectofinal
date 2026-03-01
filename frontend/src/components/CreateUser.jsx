import React from "react";
import { useForm } from "react-hook-form";
import { apiFetch } from "../utils/apiFetch";

const CreateUser = () => {
  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Respuesta del servidor:", response);
      if (!response.ok) {
        throw new Error("Error al crear usuario");
      }

      const result = await response.json();
      console.log("Usuario creado:", result);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-user">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nombre: </label>
        <input {...register("firstName")} placeholder="Nombre" />
        <label>Apellidos: </label>
        <input {...register("lastName")} placeholder="Apellidos" />
        <label>Fecha de nacimiento: </label>
        <input
          {...register("birthday")}
          type="date"
          placeholder="Fecha de nacimiento"
        />
        <label>Teléfono: </label>
        <input {...register("phone")} placeholder="Teléfono" />
        <label>Email: </label>
        <input {...register("email")} placeholder="Email" />
        <label>Nacionalidad: </label>
        <input {...register("nationality")} placeholder="Nacionalidad" />
        <label>Contraseña: </label>
        <input
          {...register("password")}
          type="password"
          placeholder="Contraseña"
        />
        <label>Rol: </label>
        <select {...register("role", { required: true })}>
          <option value="">Seleccione: </option>
          <option value="jugador">Jugador</option>
          <option value="entrenador">Entrenador</option>
          <option value="director deportivo">Director deportivo</option>
        </select>
        <label>Posición: </label>
        <select {...register("position")}>
          <option value="">Seleccione: </option>
          <option value="portero">Portero</option>
          <option value="central">Central</option>
          <option value="lateral">Lateral</option>
          <option value="medio centro">Medio centro</option>
          <option value="extremo">Extremo</option>
          <option value="media punta">Media punta</option>
          <option value="delantero">Delantero</option>
        </select>
        <label>Dorsal: </label>
        <input {...register("dorsal")} placeholder="Dorsal" />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
