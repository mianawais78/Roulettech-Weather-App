const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const { auth } = getState(); 
    if (auth.token && auth.username) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("username", auth.username);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
    return result;
  };
};

export default localStorageMiddleware;
