export function calculateTotal(expenses: any) {
    let t = 0;
    for (const x of expenses) { t+= x.amount; }
    return t;
}
