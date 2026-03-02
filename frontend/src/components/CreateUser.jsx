import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { data } from "react-router-dom";

const EditUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [state, setState] = useState("create");
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
      setState("edit");
      reset({
        ...userSelected,
        birthday: userSelected.birthday
          ? userSelected.birthday.split("T")[0]
          : "",
      });
    }
  }, [selectedId, users, reset]);

  // Guardar cambios
  const onSubmit = async (data) => {
    if (state === "create") {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error al crear usuario");
      }
      console.log("Usuario creado:", await response.json());
      alert("Usuario creado");
    }
    if (state === "edit") {
      await fetch(`http://localhost:3000/api/v1/user/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      alert("Usuario actualizado");
    }
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
      {!state === "create" && (
        <button
          type="button"
          onClick={() => {
            setState("create");
            setSelectedId("");
            reset({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              role: "",
              birthday: "",
              phone: "",
              nationality: "",
              position: "",
              dorsal: "",
            });
          }}
        >
          Crear nuevo usuario
        </button>
      )}

      {state && (
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

          <button type="submit">
            {state === "create" ? "Crear usuario" : "Guardar cambios"}
          </button>
          <button type="button" onClick={handleDelete}>
            Borrar usuario
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUser;
