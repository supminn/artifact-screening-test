import { useEffect, useReducer, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { initialState, reducer } from "../reducer/userDataReducer";
import { ActionTypes } from "../reducer/actionTypes";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { updateUsersData } from "../utils";
import { useUserData } from "../context/UserDataProvider";

const UserProfile = () => {
  const { userId } = useParams();
  const { users, setUsers } = useUserData();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toastMsg, setToastMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: state });
  const onSubmit = (payload) => {
    if (userId === "new") {
      payload.user_uuid = uuidv4();
    }
    dispatch({ type: ActionTypes.SET_CURRENT_USER_DETAILS, payload });
    updateUsersData({ payload, users, setUsers });
    // simple toast message
    setToastMsg("Data has been updated successfully");
    // auto-hide toast message
    setTimeout(() => setToastMsg(""), 2000);
  };

  useEffect(() => {
    if (userId !== "new") {
      const currentUser = users.find((user) => user.user_uuid === userId);
      dispatch({
        type: ActionTypes.SET_CURRENT_USER_DETAILS,
        payload: currentUser,
      });
    }
  }, [userId, users]);

  useEffect(() => {
    if (!state.location) {
      (async () => {
        let response = await fetch(
          `https://ipgeolocation.abstractapi.com/v1/?api_key=${
            import.meta.env.VITE_LOCATION_API_KEY
          }`
        );
        response = await response.json();
        dispatch({
          type: ActionTypes.SET_USER_LOCATION,
          payload: { country: response.country },
        });
      })();
    }
  }, []);

  return (
    <>
      <NavLink to="/users">Show All Users</NavLink>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <label>Name:</label>
        <input
          {...register("name", { required: "Name is a required field" })}
        />
        {errors?.name?.message && (
          <small className="error-msg">{errors?.name?.message}</small>
        )}
        <label>Age:</label>
        <input {...register("age", { required: "Age is a required field" })} />
        {errors?.age?.message && (
          <small className="error-msg">{errors?.age?.message}</small>
        )}
        <label>Gender:</label>
        <select
          {...register("gender", { required: "Gender is a required field" })}
        >
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        {errors?.gender?.message && (
          <small className="error-msg">{errors?.gender?.message}</small>
        )}
        <label>Location:</label>
        <input
          {...register("location", {
            required: "Location is a required field",
          })}
        />
        {errors?.location?.message && (
          <small className="error-msg">{errors?.location?.message}</small>
        )}
        <label>interest1</label>
        <input {...register("interest1")} />
        <label>Interest2:</label>
        <input {...register("interest2")} />
        <label>Email:</label>
        <input
          {...register("email", { required: "Email is a required field" })}
        />
        {errors?.email?.message && (
          <small className="error-msg">{errors.email.message}</small>
        )}
        <label>Username:</label>
        <input
          {...register("username", {
            required: "Username is a required field",
          })}
        />
        {errors?.userName?.message && (
          <small className="error-msg">{errors.userName.message}</small>
        )}
        <label>Display Name:</label>
        <input
          {...register("displayName", {
            required: "Display Name is a required field",
          })}
        />
        {errors?.displayName?.message && (
          <small className="error-msg">{errors.displayName.message}</small>
        )}
        <label>Avatar URI:</label>
        <input {...register("avatarURI")} />
        <input type="submit" value={userId === "new" ? "Save" : "Update"} />
      </form>
      {toastMsg && <div>{toastMsg}</div>}
    </>
  );
};

export { UserProfile };
