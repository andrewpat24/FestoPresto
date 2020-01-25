const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_EVENT":
      return {
        dates: [],
        stages: []
      };
    case "EDIT_EVENT":
      return {
        ...action.update
      };
    case "CLEAR_EVENT":
      return {};
    default:
      return { ...state };
  }
};

export default eventReducer;
