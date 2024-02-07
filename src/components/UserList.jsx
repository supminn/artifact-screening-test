import { NavLink, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataProvider";

const UserList = () => {
  const { users } = useUserData();
  const navigate = useNavigate();

  return (
    <>
      <NavLink to="/users/new">Create New User</NavLink>
      <h1>Users List</h1>
      {users.map((user) => (
        <div
          key={user.user_uuid}
          className="user-card"
          onClick={() => navigate(`/users/${user.user_uuid}`)}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
};

export { UserList };
