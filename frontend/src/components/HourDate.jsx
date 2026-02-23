import React from "react";
import { useCurrentTime } from "../hooks/useCurrentTime.jsx";
import "../styles/hourdate.css";

//componente que nos pone en pantalla la fecha y hora actuales
const HourDate = () => {
  const time = useCurrentTime();

  //formateamos la fecha para facilitar su lectura
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <nav className="hourDateDisplay">
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
    </nav>
  );
};

export default HourDate;
