import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const initialState = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

const UserList = () => {
  const [users, setUsers] = useState(initialState);
  const navigate = useNavigate();
  useEffect(() => {
    if (users.length === 0) {
      (async () => {
        let response = await fetch("/userData.json");
        response = await response.json();
        const userList = response.users;
        if (userList.length > 0) {
          setUsers();
          localStorage.setItem("users", JSON.stringify(userList));
        }
      })();
    }
  }, [users]);

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
