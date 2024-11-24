import {calculateTotal} from "../functions/ExpenseTrackerFunctions";

export const addExpenseToLS = (e: any, yearMonth: String) => {
    const localStorage = window.localStorage;
    const expenses = localStorage.getItem("expenses/" + yearMonth);
    const newExpenses = expenses != null ? JSON.parse(expenses) : [];
    newExpenses.push(e);
    localStorage.setItem("expenses/" + yearMonth, JSON.stringify(newExpenses));
};

export const viewExpensesToLS = (yearMonth: any) => {
    const localStorage = window.localStorage;
    const expenses = localStorage.getItem("expenses/" + yearMonth);
    const expensesParsed = expenses != null ? JSON.parse(expenses) : [];
    console.log("viewExpensesToLS ", expensesParsed);
    return expensesParsed;
};

export const totalExpensesLS = (yearMonth) => {
    const localStorage = window.localStorage;
    const expenses = localStorage.getItem("expenses/" + yearMonth);
    const expensesParsed = expenses != null ? JSON.parse(expenses) : [];
    console.log("totalExpensesLS ", expensesParsed);
    return calculateTotal(expensesParsed);
}

    // key = addExpense
    // value = {
            //     date: date,
            //     amount: amount,
            //     description: desc,
            //     yearMonth: yearMonth
            // }
    // get expenses: window.localStorage.getItem('expenses), append to list, JSON.stringify(list), set expenses: window.localStorage.setItem('expenses)
