export const login = (token, username) => {
  return {
    type: "LOGIN",
    payload: {
      token,
      username,
    },
  };
};


export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
