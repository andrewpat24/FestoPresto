import getExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

// const total = getExpensesTotal(expenses);
// console.log(total);

// Should return 0 if no expenses

test("Should return 0 if no expenses are provided.", () => {
  const result = getExpensesTotal([]);
  expect(result).toEqual(0);
});

// Should add up a single expense
test("Should add up a single expense.", () => {
  const data = [
    {
      id: "1",
      description: "Gum bill",
      note: "Test note",
      amount: 50,
      createdAt: 0
    }
  ];
  const result = getExpensesTotal(data);
  console.log(result);
  expect(result).toEqual(data[0].amount);
});

// Should add up multiple expenses.
test("Should add up multiple expenses.", () => {
  const result = getExpensesTotal(expenses);
  console.log(result);
  expect(result).toEqual(50 + 25000 + 50000);
});
