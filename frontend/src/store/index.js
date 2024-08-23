import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import localStorageMiddleware from "./middleware/localStorageMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
