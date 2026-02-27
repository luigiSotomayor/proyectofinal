import { useAuth } from "../context/AuthContext.jsx";

const UserSubHeader = () => {
  const { user } = useAuth();
  const userRole = user?.role.charAt(0).toUpperCase() + user?.role.slice(1);

  if (!user) return null;
  return (
    <div className="usersubheader">
      {userRole}: {user?.firstName} {user?.lastName}
    </div>
  );
};

export default UserSubHeader;
