export const newEvent = () => ({
  type: "NEW_EVENT"
});

export const editEvent = (oldFields = {}, updatedFields = {}) => ({
  type: "EDIT_EVENT",
  update: {
    ...oldFields,
    ...updatedFields
  }
});

export const clearEvent = () => ({
  type: "CLEAR_EVENT"
});
