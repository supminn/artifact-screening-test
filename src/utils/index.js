export const updateUsersData = ({ payload, users, setUsers }) => {
  const existingUser = users.find(
    (user) => user.user_uuid === payload.user_uuid
  );
  if (existingUser) {
    const updatedList = users.map((user) =>
      user.user_uuid === payload.user_uuid ? { ...payload } : { ...user }
    );
    setUsers(updatedList);
    localStorage.setItem("users", JSON.stringify(updatedList));
  } else {
    const appendedList = [...users, { ...payload }];
    setUsers(appendedList);
    localStorage.setItem("users", JSON.stringify(appendedList));
  }
};
