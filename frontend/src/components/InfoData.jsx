import React from "react";
import InfoUser from "./InfoUser.jsx";
import CreateUser from "./CreateUser.jsx";
import DeleteUser from "./DeleteUser.jsx";
import EditUser from "./EditUser.jsx";
import CreateTeam from "./CreateTeam.jsx";
import DeleteTeam from "./DeleteTeam.jsx";
import EditTeam from "./EditTeam.jsx";

const InfoData = ({ mode }) => {
  return (
    <div>
      {mode === "usuario" && (<InfoUser />)}
      {mode === "usercreate" && (<CreateUser />)}
      {mode === "userdelete" && (<DeleteUser />)}
      {mode === "useredit" && (<EditUser />)}
      {mode === "teamcreate" && (<CreateTeam />)}
      {mode === "teamdelete" && (<DeleteTeam />)}
      {mode === "teamedit" && (<EditTeam />)}
    </div>
  );
};

export default InfoData;
