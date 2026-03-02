import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { data } from "react-router-dom";

const EditUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const token = localStorage.getItem("token");
  const { register, handleSubmit, reset } = useForm();

  // Cargar usuarios al montar
  useEffect(() => {
    const loadUsersList = async () => {
      try {
        const usersList = await fetch("http://localhost:3000/api/v1/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setUsers(data));
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    loadUsersList();
  }, []);

  // Cuando cambia el usuario seleccionado
  useEffect(() => {
    if (!selectedId) return;

    const userSelected = users.find((u) => u._id === selectedId);
    if (userSelected) {
      reset({
        ...userSelected,
        birthday: userSelected.birthday
          ? userSelected.birthday.split("T")[0]
          : "",
      }); // 🔥 Rellena el formulario
    }
  }, [selectedId, users, reset]);

  // Guardar cambios
  const onSubmit = async (data) => {
    await fetch(`http://localhost:3000/api/v1/user/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    alert("Usuario actualizado");
  };

  // Borrar usuario
  const handleDelete = async () => {
    await fetch(`http://localhost:3000/api/v1/user/${selectedId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(users.filter((u) => u._id !== selectedId));
    setSelectedId("");
    reset();
    alert("Usuario eliminado");
  };

  return (
    <div>
      {/* 🔹 PARTE 1: SELECT */}
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Selecciona un usuario</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>

      {/* 🔹 PARTE 2: FORMULARIO */}
      {selectedId && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nombre: </label>
          <input {...register("firstName")} />
          <label>Apellidos: </label>
          <input {...register("lastName")} />
          <label>Fecha de nacimiento: </label>
          <input {...register("birthday")} type="date" />
          <label>Teléfono: </label>
          <input {...register("phone")} />
          <label>Email: </label>
          <input {...register("email")} />
          <label>Nacionalidad: </label>
          <input {...register("nationality")} />
          <label>Contraseña: </label>
          <input {...register("password")} type="password" />
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
          <input {...register("dorsal")} />

          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={handleDelete}>
            Borrar usuario
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUser;
