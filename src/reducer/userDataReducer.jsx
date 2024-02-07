import { ActionTypes } from "./actionTypes";

export const initialState = {
  user_uuid: "",
  name: "",
  age: "",
  gender: "",
  location: "",
  interest1: "",
  interest2: "",
  email: "",
  username: "",
  displayName: "",
  avatarURI: "",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_CURRENT_USER_DETAILS: {
      return { ...state, ...payload };
    }
    case ActionTypes.SET_USER_LOCATION: {
      return { ...state, location: payload.country };
    }
    default:
      return state;
  }
};
