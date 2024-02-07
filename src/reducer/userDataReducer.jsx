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
    // case ActionTypes.SET_USER_NAME: {
    //   return { ...state, name: payload.name };
    // }
    // case ActionTypes.SET_USER_AGE: {
    //   return { ...state, age: payload.age };
    // }
    // case ActionTypes.SET_USER_GENDER: {
    //   return { ...state, gender: payload.gender };
    // }
    // case ActionTypes.SET_USER_EMAIL: {
    //   return { ...state, email: payload.email };
    // }
    // case ActionTypes.SET_USER_USERNAME: {
    //   return { ...state, username: payload.username };
    // }
    // case ActionTypes.SET_USER_DISPLAY_NAME: {
    //   return { ...state, displayName: payload.displayName };
    // }
    // case ActionTypes.SET_USER_AVATAR_URI: {
    //   return { ...state, avatarURI: payload.avatarURI };
    // }
    default:
      return state;
  }
};
