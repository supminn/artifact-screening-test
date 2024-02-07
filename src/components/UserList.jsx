import { NavLink, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataProvider";
import "./userList.css";

const UserList = () => {
  const { users } = useUserData();
  const navigate = useNavigate();

  return (
    <>
      <NavLink to="/users/new">Create New User</NavLink>
      <h1>Users List</h1>
      <div className="user-list">
        {users.map((user) => (
          <div
            className="user-card"
            key={user.user_uuid}
            onClick={() => navigate(`/users/${user.user_uuid}`)}
          >
            <h2>
              {user.name} ({user.display_name})
            </h2>
            <p>
              Age: {user.age} | Gender: {user.gender} | Location:{" "}
              {user.location}
            </p>
            <p>
              Interests: {user.interest1}, {user.interest2}
            </p>
            <p>
              Email: {user.email} | Username: {user.username}
            </p>
            <img src={user.avatarURI} alt="User Avatar" />
          </div>
        ))}
      </div>
    </>
  );
};

export { UserList };
