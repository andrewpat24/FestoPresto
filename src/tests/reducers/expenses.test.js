import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("Should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("Should remove expense by ID", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("Should not remove expense if ID not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1"
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

// Should add an expense
test("Should add an expense", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      id: "5",
      description: "Credit",
      note: "Test note",
      amount: 50000,
      createdAt: 0
    }
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    ...expenses,
    {
      id: "5",
      description: "Credit",
      note: "Test note",
      amount: 50000,
      createdAt: 0
    }
  ]);
});

// Should edit an expense
test("Should edit an expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: 1,
    updates: {
      note: "potato"
    }
  };
  const state = expensesReducer(expenses, action);
  let testExpenses = expenses;
  testExpenses[0].note = "potato";
  expect(state).toEqual(testExpenses);
});

// Should not edit expense if expense not found
test("Should not edit an expense if provided invalid ID", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: 69,
    updates: {
      note: "potato"
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("Should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
