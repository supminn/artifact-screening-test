import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { initialState, reducer } from "../reducer/userDataReducer";
import { ActionTypes } from "../reducer/actionTypes";

const UserProfile = () => {
  const { userId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (userId !== "new") {
      const userList = JSON.parse(localStorage.getItem("users"));
      const currentUser = userList.find((user) => user.id === userId);
      dispatch({
        type: ActionTypes.SET_CURRENT_USER_DETAILS,
        payload: currentUser,
      });
    }
  });
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

  return <div>UserProfile: {state.location}</div>;
};

export { UserProfile };
