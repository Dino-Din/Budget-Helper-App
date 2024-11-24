CREATE OR REPLACE FUNCTION getExpensesSummary() 
RETURNS TABLE (
    year_month VARCHAR,
    budget DOUBLE PRECISION,
    total DOUBLE PRECISION,
    difference DOUBLE PRECISION
) AS 
$$
BEGIN
    -- Calculate total expenses for each year_month
    RETURN QUERY
    SELECT expenses.year_month, 
           budget.budget, 
           COALESCE(SUM(expenses.amount), 0), 
           budget.budget - COALESCE(SUM(expenses.amount), 0)
    FROM expenses
    LEFT JOIN budget ON budget.year_month = expenses.year_month
    GROUP BY expenses.year_month, budget.budget
    ORDER BY expenses.year_month DESC;

END;
$$
LANGUAGE plpgsql;