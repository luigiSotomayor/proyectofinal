import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/CreateUser.css";
import Button from "./Button.jsx";

const EditUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [state, setState] = useState("create");
  const token = localStorage.getItem("token");
  const { register, handleSubmit, reset } = useForm();

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

  // Cargar usuarios al montar
  useEffect(() => {
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
      await loadUsersList();
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

      await loadUsersList();
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

  const buttonCreateUser = (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="create-user-section">
      <div className="encabezado">
        <select
          className="select-user-section"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.lastName}, {user.firstName}
            </option>
          ))}
        </select>
        {state === "edit" && (
          <Button
            type="button"
            text="Crear usuario"
            onClick={buttonCreateUser}
          />
        )}
      </div>

      {state && (
        <form className="form-section" onSubmit={handleSubmit(onSubmit)}>
          <section className="subsection-1 subsection-form">
            <label>Nombre: </label>
            <input {...register("firstName")} />
            <label>Apellidos: </label>
            <input {...register("lastName")} />
          </section>
          <section className="subsection-2 subsection-form">
            <label>Nación: </label>
            <input {...register("nationality")} />
            <label>Cumpleaños: </label>
            <input {...register("birthday")} type="date" />
          </section>
          <section className="subsection-3 subsection-form">
            <label>Email: </label>
            <input {...register("email")} />
            <label>Contraseña: </label>
            <input {...register("password")} type="password" />
          </section>
          <section className="subsection-4 subsection-form">
            <label>Teléfono: </label>
            <input {...register("phone")} />
            <label>Dorsal: </label>
            <input {...register("dorsal")} />
          </section>
          <section className="subsection-5 subsection-form">
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
          </section>
          <section className="button-form">
            <Button type="submit" text="Guardar"/>
            <Button type="button" text="Borrar" onClick={handleDelete}/>
          </section>
        </form>
      )}
    </div>
  );
};

export default EditUser;
