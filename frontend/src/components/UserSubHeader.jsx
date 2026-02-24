import { useAuth } from "../context/AuthContext.jsx";

const UserSubHeader = () => {
  const { user } = useAuth();

  return (
    <div className="usersubheader">
      {user.role}: {user.firstName} {user.lastName}
    </div>
  );
};

export default UserSubHeader;

