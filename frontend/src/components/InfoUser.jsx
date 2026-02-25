import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { formatDate } from "../utils/formatDate.js";
import { useState, useEffect } from "react";
import { apiFetch } from "../utils/apiFetch.js";

const InfoUser = () => {
  const [teamOfPlayer, setTeamOfPlayer] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const teamReq = await apiFetch(
          `http://localhost:3000/api/v1/team/team/${user._id}`,
        );
        setTeamOfPlayer(teamReq);
      } catch (error) {
        console.error(error);
      }
    };

    if (user && user._id) {
      loadTeam();
    }
  }, [user]);

  return (
    <div>
      <h1>
        {user?.firstName} {user?.lastName}
      </h1>
      <h4>Equipo: {teamOfPlayer.name}</h4>
      <h4>
        Posición: {user?.position} Dorsal: {user?.dorsal}
      </h4>
      <h4>Fecha nacimiento: {formatDate(user?.birthday)}</h4>
      <h4>Teléfono: {user?.phone}</h4>
      <h4>Email: {user?.email}</h4>
      <h4>País: {user?.nationality}</h4>
    </div>
  );
};

export default InfoUser;
