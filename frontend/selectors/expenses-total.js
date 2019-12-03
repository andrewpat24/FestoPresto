const getExpensesTotal = expenses => {
  if (expenses.length === 0) {
    return 0;
  }

  const getAmount = item => {
    return item.amount;
  };

  const getSum = (prev, next) => {
    return prev + next;
  };

  const result = expenses.map(getAmount).reduce(getSum);
  return result;
};

export default getExpensesTotal;
