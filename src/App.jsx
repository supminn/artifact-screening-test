import { NavLink } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <h1>User Directory</h1>
      <div style={{ display: "flex", gap: "2rem" }}>
        <NavLink to="/users">View Users List</NavLink>
        <NavLink to="/users/new">Create New User</NavLink>
      </div>
    </>
  );
}

export default App;
