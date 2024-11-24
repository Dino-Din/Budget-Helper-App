type DisplayExpense = {
    date: string,
    amount: string,
    description: string
}

type ExpenseDto = {
    date: string,
    amount: string,
    description: string,
    yearMonth: string
}

type ExpenseDbDto = {
    id: number,
    date: string,
    amount: number,
    description: string,
    yearMonth: string
}

type ExpensesSummary = {
    yearMonth: string,
    budget: string,
    total: string,
    difference: string
}