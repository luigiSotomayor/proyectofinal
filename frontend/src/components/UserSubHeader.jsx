import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const UserSubHeader = () => {
  const [data, setData] = useState(null);
  const { user } = useAuth();

  return (
    <div className="usersubheader">
      {user.role}: {user.firstName} {user.lastName} 
    </div>
  );
};

export default UserSubHeader;

