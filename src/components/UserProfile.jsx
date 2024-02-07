import { useEffect, useReducer, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { initialState, reducer } from "../reducer/userDataReducer";
import { ActionTypes } from "../reducer/actionTypes";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { updateUsersData } from "../utils";
import { useUserData } from "../context/UserDataProvider";
import "./userProfile.css";
import { bearerToken, sampleAPIResponse, url } from "../utils/constants";

const UserProfile = () => {
  const { userId } = useParams();
  const { users, setUsers } = useUserData();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toastMsg, setToastMsg] = useState("");
  console.log("state", state);
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

  // auto-fill user data if the user already exists. They can edit and update their details
  useEffect(() => {
    if (userId !== "new") {
      const currentUser = users.find((user) => user.user_uuid === userId);
      dispatch({
        type: ActionTypes.SET_CURRENT_USER_DETAILS,
        payload: currentUser,
      });
    }
  }, [userId]);

  // auto-populate the user's location based on geoLocation API
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

  // fetch the Email, Username, Display name, and Avatar URI details for the user
  const populateUserInformation = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const responseData = await response.json();
      console.log("Turbo 🚀 ~ responseData:", responseData);

      console.log("smaple", sampleAPIResponse);
      // this will update the necessary fields for this user - replace 'sampleAPIResponse' with 'responseData'
      dispatch({
        type: ActionTypes.SET_CURRENT_USER_DETAILS,
        payload: sampleAPIResponse.profile,
      });

      //alternatively, we could explicitly update just the email, username, display name and AvatarURI by passing just them as payload
      // dispatch({
      //   type: ActionTypes.SET_CURRENT_USER_DETAILS,
      //   payload: {
      //     display_name: sampleAPIResponse.display_name,
      //     username: sampleAPIResponse.username,
      //     email: sampleAPIResponse.email,
      //     avatar_uri: sampleAPIResponse.avatar_uri,
      //   },
      // });
    } catch (error) {
      console.error("Error in fetching user data from API");
    }
  };

  return (
    <>
      <NavLink to="/users">Show All Users</NavLink>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <div className="form-section">
          <div className="input-section">
            <label>Name:</label>
            <input
              {...register("name", { required: "Name is a required field" })}
            />
          </div>
          {errors?.name?.message && (
            <small className="error-msg">{errors?.name?.message}</small>
          )}
        </div>
        <div className="form-section">
          <div className="input-section">
            <label>Age:</label>
            <input
              {...register("age", { required: "Age is a required field" })}
            />
          </div>
          {errors?.age?.message && (
            <small className="error-msg">{errors?.age?.message}</small>
          )}
        </div>
        <div className="form-section">
          <div className="input-section">
            <label>Gender:</label>
            <select
              {...register("gender", {
                required: "Gender is a required field",
              })}
            >
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
          </div>
          {errors?.gender?.message && (
            <small className="error-msg">{errors?.gender?.message}</small>
          )}
        </div>
        <div className="form-section">
          <div className="input-section">
            <label>Location:</label>
            <input
              {...register("location", {
                required: "Location is a required field",
              })}
            />
          </div>
          {errors?.location?.message && (
            <small className="error-msg">{errors?.location?.message}</small>
          )}
        </div>
        <div className="form-section">
          <div className="input-section">
            <label>interest1</label>
            <input {...register("interest1")} />
          </div>
        </div>
        <div className="form-section">
          <div className="input-section">
            <label>Interest2:</label>
            <input {...register("interest2")} />
          </div>
        </div>
        <div className="form-section">
          <div className="input-section">
            {" "}
            <label>Email:</label>
            <input
              {...register("email", { required: "Email is a required field" })}
            />
          </div>
          {errors?.email?.message && (
            <small className="error-msg">{errors.email.message}</small>
          )}
        </div>
        <div className="form-section">
          <div className="input-section">
            {" "}
            <label>Username:</label>
            <input
              {...register("username", {
                required: "Username is a required field",
              })}
            />
          </div>
          {errors?.userName?.message && (
            <small className="error-msg">{errors.userName.message}</small>
          )}
        </div>
        <div className="form-section">
          <div className="input-section">
            <label>Display Name:</label>
            <input
              {...register("display_name", {
                required: "Display Name is a required field",
              })}
            />
          </div>
          {errors?.display_name?.message && (
            <small className="error-msg">{errors.display_name.message}</small>
          )}
        </div>
        <div className="input-section">
          <label>Avatar URI:</label>
          <input {...register("avatarURI")} />
        </div>
        <input
          className="button"
          type="submit"
          value={userId === "new" ? "Save" : "Update"}
        />
      </form>
      {toastMsg && <div>{toastMsg}</div>}
      <hr />
      <button className="sec-button" onClick={populateUserInformation}>
        Populate User Data
      </button>
    </>
  );
};

export { UserProfile };
