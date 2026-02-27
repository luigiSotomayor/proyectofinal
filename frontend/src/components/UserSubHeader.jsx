import { useAuth } from "../context/AuthContext.jsx";

const UserSubHeader = () => {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <div className="usersubheader">
      {user?.role}: {user?.firstName} {user?.lastName}
    </div>
  );
};

export default UserSubHeader;
