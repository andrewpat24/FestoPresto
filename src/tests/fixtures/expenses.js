import moment from "moment";

const expenses = [
  {
    id: "1",
    description: "Gum bill",
    note: "Test note",
    amount: 50,
    createdAt: moment(0)
      .add(0, "days")
      .valueOf()
  },
  {
    id: "2",
    description: "Rent bill",
    note: "Test note",
    amount: 25000,
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "3",
    description: "Credit bill",
    note: "Test note",
    amount: 50000,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  }
];

export default expenses;
