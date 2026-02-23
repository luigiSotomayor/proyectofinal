import React from "react";
import { useCurrentTime } from "../hooks/useCurrentTime";
import "../styles/hourdate.css";

//componente que nos pone en pantalla la fecha y hora actuales
const HourDate = () => {
  const time = useCurrentTime();

  //formateamos la fecha para facilitar su lectura
  const formattedDate = time.toLocaleTimeString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="hourDateDisplay">
      <p>{formattedDate}</p>
    </nav>
  );
};

export default HourDate;
