package dna.budget.helper.project.budgethelper.services;

import dna.budget.helper.project.budgethelper.dto.ExpenseDto;
import dna.budget.helper.project.budgethelper.models.ExpensesSummary;

import java.util.List;


public interface ExpenseService {
    List<ExpenseDto> findAllExpenses();
    ExpenseDto addExpense(ExpenseDto expenseDto) throws Exception;
    List<ExpenseDto> findAllExpensesByYearMonth(String yearMonth);
    double sumExpensesByYearMonth(String yearMonth);
    List<ExpensesSummary> getExpensesSummary();
    double getSummaryAverage();

}
