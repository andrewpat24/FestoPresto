export default (state = { value: 0 }, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        uid: action.uid
      };
    case "LOGOUT":
      return {};
    case "FETCH_USER":
      return action.payload;
    case "SET_VALUE":
      return {
        value: state.value + action.value
      };
    default:
      return state;
  }
};
