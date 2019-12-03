const getVisibleExpenses = (
  expenses,
  /* filters:*/ { text, sortBy, startDate, endDate }
) => {
  return expenses
    .filter(expense => {
      const startDateMatch = !startDate || expense.createdAt >= startDate;
      const endDateMatch = !endDate || expense.createdAt <= endDate;
      const textMatch = expense.description.toLowerCase().includes(text);
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

export default getVisibleExpenses;
