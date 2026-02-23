import React from "react";
import { useState, useEffect } from "react";
import { apiFetch } from "../utils/apiFetch.js";

const UserSubHeader = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const url = `http://localhost:3000/api/v1/user/${userId}`;
        const response = await apiFetch(url);

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);
  return (
    <div className="usersubheader">
      {data?.role}: {data?.firstName} {data?.lastName} 
    </div>
  );
};

export default UserSubHeader;
