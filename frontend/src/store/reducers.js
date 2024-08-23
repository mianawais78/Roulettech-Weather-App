import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import locationsReducer from "../reducers/locationsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  locations: locationsReducer,
});

export default rootReducer;
