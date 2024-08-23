const initialState = {
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || "", 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        username: "",
      };
    default:
      return state;
  }
};

export default authReducer;
