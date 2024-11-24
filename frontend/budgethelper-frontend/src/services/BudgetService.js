import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/budget-helper/api/budget';

export const getBudgets = () => axios.get(REST_API_BASE_URL);
export const addDefaultBudget = (newBudget) => axios.post(REST_API_BASE_URL + '/add-default', newBudget);
export const updateBudget = (newBudget) => axios.put(REST_API_BASE_URL + '/update-budget', newBudget);
export const getBudget = (yearMonth) => axios.get(REST_API_BASE_URL + '/' + yearMonth, yearMonth);
