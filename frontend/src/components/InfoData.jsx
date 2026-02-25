import React from "react";
import InfoUser from "./InfoUser.jsx";

const InfoData = ({ comp }) => {
  return (
    <div>
      {comp === "usuario" && (
        <div>
          <InfoUser />
        </div>
      )}
    </div>
  );
};

export default InfoData;
