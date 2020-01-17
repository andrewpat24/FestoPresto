export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        uid: action.uid,
        access_token: action.access_token
      };
    case "LOGOUT":
      return {
        ...state,
        uid: action.uid,
        access_token: action.access_token
      };
    case "UPDATE_ACCESS_TOKEN":
      return {
        ...state,
        access_token: action.access_token
      };
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
