import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses,
  startEditExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);
const uid = "SomeTestID";
const defaultAuthStore = {
  auth: {
    uid
  }
};

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => {
      done();
    });
});

test("Should setup add expense action object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("Should add expense to database and store", done => {
  const store = createMockStore(defaultAuthStore);
  const expenseData = {
    description: "Mouse",
    amount: 34223,
    note: "Thing 2",
    createdAt: 1893
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("Should add default expense to database and store", done => {
  const store = createMockStore(defaultAuthStore);
  const expenseData = {};
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          description: "",
          note: "",
          amount: 0,
          createdAt: 0
        }
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual({
        description: "",
        note: "",
        amount: 0,
        createdAt: 0
      });
      done();
    });
});

test("Should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("Should fetch the expenses from firebase", done => {
  const store = createMockStore(defaultAuthStore);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});

test("Should setup remove expense action object", () => {
  const action = removeExpense({ id: "420" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "420"
  });
});

test("Should remove expense from database and store", done => {
  const store = createMockStore(defaultAuthStore);
  const id = 2;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "REMOVE_EXPENSE",
      id
    });

    return database
      .ref(`users/${uid}/expenses/${id}`)
      .once("value")
      .then(result => {
        expect(result.val()).toBeFalsy();
        done();
      });
  });
});

test("Should setup edit expense action object", () => {
  const action = editExpense("420", { name: "Steve" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "420",
    updates: {
      name: "Steve"
    }
  });
});

test("Should edit expense in database and store", done => {
  const store = createMockStore(defaultAuthStore);
  const currentItem = expenses[0];
  const updates = {
    amount: 696969,
    description: "gun lowodkf",
    note: "Test dsfocjvkxkclv"
  };

  store.dispatch(startEditExpense(currentItem.id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "EDIT_EXPENSE",
      id: currentItem.id,
      updates: { ...updates }
    });

    database
      .ref(`users/${uid}/expenses/${currentItem.id}`)
      .once("value")
      .then(result => {
        const updatedResult = result.val();
        expect(updatedResult).toEqual({
          ...updatedResult,
          ...updates
        });
        done();
      });
  });
});
