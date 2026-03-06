import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { formatDate } from "../utils/formatDate.js";
import { useState, useEffect } from "react";
import { apiFetch } from "../utils/apiFetch.js";
import "../styles/InfoUser.css";

const InfoUser = () => {
  const [teamOfPlayer, setTeamOfPlayer] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const loadTeam = async () => {
      try {
        if (user?.role === "jugador") {
          const teamReq = await apiFetch(
            `http://localhost:3000/api/v1/team/user/${user._id}`,
          );
          setTeamOfPlayer(teamReq);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user && user._id) {
      loadTeam();
    }
  }, [user]);

  return (
    <div className="user-section">
      <h1 className="nameTitle">
        {user?.firstName} {user?.lastName}
      </h1>
      {user?.role === "jugador" && (
        <div className="role-section">
          <section className="role-subsection subsection">
            <h4 className="labelData">Equipo:</h4>
            <p className="valueData">{teamOfPlayer.name}</p>
          </section>
          <section className="role-subsection subsection">
            <h4 className="labelData">Posición:</h4>{" "}
            <p className="valueData">{user?.position}</p>{" "}
            <h4 className="labelData">Dorsal:</h4>{" "}
            <p className="valueData">{user?.dorsal}</p>
          </section>
        </div>
      )}
      {user?.role === "entrenador" && (
        <div className="role-section subsection">
          <h4 className="labelData">Puesto:</h4>{" "}
          <p className="valueData">Entrenador</p>
        </div>
      )}
      {user?.role === "director deportivo" && (
        <div className="role-section subsection">
          <h4 className="labelData">Puesto:</h4>{" "}
          <p className="valueData">Director deportivo</p>
        </div>
      )}
      <section className="birthday-subsection subsection">
        <h4 className="labelData">Fecha nacimiento:</h4>{" "}
        <p className="valueData">{formatDate(user?.birthday)}</p>
      </section>
      <section className="phone-subsection subsection">
        <h4 className="labelData">Teléfono:</h4>{" "}
        <p className="valueData">{user?.phone}</p>
      </section>
      <section className="mail-subsection subsection">
        <h4 className="labelData">Email:</h4>{" "}
        <p className="valueData">{user?.email}</p>
      </section>
      <section className="country-subsection subsection">
        <h4 className="labelData">País:</h4>{" "}
        <p className="valueData">{user?.nationality}</p>
      </section>
    </div>
  );
};

export default InfoUser;
