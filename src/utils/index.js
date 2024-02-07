export const updateLocalStorage = (data) => {
  const userList = JSON.parse(localStorage.getItem("users"));
  const existingUser = userList.find(
    (user) => user.user_uuid === data.user_uuid
  );
  if (existingUser) {
    const updatedList = userList.map((user) =>
      user.user_uuid === data.user_uuid ? { ...data } : { ...user }
    );
    localStorage.setItem("users", JSON.stringify(updatedList));
  } else {
    const appendedList = [...userList, { ...data }];
    localStorage.setItem("users", JSON.stringify(appendedList));
  }
};
