import React from "react";
import InfoUser from "./InfoUser.jsx";
import CreateUser from "./CreateUser.jsx";

const InfoData = ({ mode }) => {
  return (
    <div>
      {mode === "usuario" && (<InfoUser />)}
      {mode === "usercreate" && (<CreateUser />)}
      {mode === "userdelete" && (<div>DeleteUser</div>)}
      {mode === "useredit" && (<div>EditUser</div>)}
      {mode === "teamcreate" && (<div>CreateTeam</div>)}
      {mode === "teamdelete" && (<div>DeleteTeam</div>)}
      {mode === "teamedit" && (<div>EditTeam</div>)}
    </div>
  );
};

export default InfoData;
