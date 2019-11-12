import React from "react";
// Components
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";

const Dashboard = () => (
  <section component="Dashboard">
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </section>
);

export default Dashboard;
