const initialState = [];

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LOCATION":
      return [...state, action.payload];
    case "REMOVE_LOCATION":
      return state.filter((location) => location.name !== action.payload);
    case "SET_LOCATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default locationsReducer;
