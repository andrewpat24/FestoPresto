export default (state = {}, action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return {
        ...state,
        events: action.events
      };
    default:
      return state;
  }
};
