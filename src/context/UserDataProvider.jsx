/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const UserDataContext = createContext(null);

const initialState = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

const UserDataProvider = ({ children }) => {
  const [users, setUsers] = useState(initialState);
  useEffect(() => {
    if (users.length === 0) {
      (async () => {
        let response = await fetch("/userData.json");
        response = await response.json();
        const userList = response.users;
        if (userList.length > 0) {
          setUsers(userList);
          localStorage.setItem("users", JSON.stringify(userList));
        }
      })();
    }
  }, [users]);
  return (
    <UserDataContext.Provider value={{ users, setUsers }}>
      {children}
    </UserDataContext.Provider>
  );
};

const useUserData = () => useContext(UserDataContext);

export { useUserData, UserDataProvider };
