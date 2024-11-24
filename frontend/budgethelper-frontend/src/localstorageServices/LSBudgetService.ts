export const getBudgetLS = (yearMonth: any) => {
    const localStorage = window.localStorage;
    const budget = localStorage.getItem("budget/" + yearMonth);
    const budgetParsed = budget != null ? JSON.parse(budget) : {yearMonth: yearMonth, budget: 0};
    console.log("getBudgetLS ", budgetParsed);
    return budgetParsed;
}; 

export const addDefaultBudgetToLS = (budgetDto: any) => {
    const localStorage = window.localStorage;
    const budget = localStorage.getItem("budget/" + budgetDto.yearMonth);
    if (budget == null) {
        localStorage.setItem("budget/" + budgetDto.yearMonth, JSON.stringify(budgetDto));
        addToBudgetListLS(budgetDto.yearMonth);
    }
};

export const addBudgetToLS = (budgetDto: any) => {
    const localStorage = window.localStorage;
    localStorage.setItem("budget/" + budgetDto.yearMonth, JSON.stringify(budgetDto));
    return budgetDto;
};

export const addToBudgetListLS = (yearMonth) => {
    const localStorage = window.localStorage;
    const budgetList = localStorage.getItem("budgetList");
    const newBudgetList = budgetList != null ? JSON.parse(budgetList) : [];
    newBudgetList.push({yearMonth: yearMonth, budget: "0"});
    localStorage.setItem("budgetList", JSON.stringify(newBudgetList));
    
};

export const getBudgetListLS = () => {
    console.log("getBudgetListLS ");
    const localStorage = window.localStorage;
    const budgetList = localStorage.getItem("budgetList");
    const budgetListParsed = budgetList != null ? JSON.parse(budgetList) : [];
    
    return budgetListParsed;
}; 



    /* 
        budget:"{
                    "2024-03": 500, 
                    "2024-02": 1000
                }"
    
    */

