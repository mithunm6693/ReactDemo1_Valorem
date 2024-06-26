import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

const ExpenseList = ({ expenses }) => (
    <div>
        <h1>Expense List</h1>
        <div>
            {expenses.map((expense) => (
                <ExpenseListItem key={expense.id} {...expense} />
            ))}
        </div>
    </div>
);

const mapStateToProps = (state)=>{
    return {
        expenses:selectExpenses(state.expenses,state.filters),
 
    };
};


export default connect(mapStateToProps)(ExpenseList);