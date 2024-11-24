import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/budget-helper/api/expenses';
const REST_API_POST_URL = 'http://localhost:8080/budget-helper/api/expenses/add-expense';

export const listExpenses = () => axios.get(REST_API_BASE_URL);

export const listExpensesYearMonth = (yearMonth) => axios.get(REST_API_BASE_URL + '/' + yearMonth);

export const getTotalExpensesYearMonth = (yearMonth) => axios.get(REST_API_BASE_URL + '/sum/' + yearMonth);

export const addExpense = (expenseDto) => axios.post(REST_API_POST_URL, expenseDto);

export const getExpensesSummary = () => axios.get(REST_API_BASE_URL + '/summary');
export const getSummaryAvg = () => axios.get(REST_API_BASE_URL + '/summary/average');