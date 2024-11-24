package dna.budget.helper.project.budgethelper.mapper;

import dna.budget.helper.project.budgethelper.dto.ExpenseDto;
import dna.budget.helper.project.budgethelper.models.Expense;

public class ExpenseMapper {

    public static ExpenseDto mapToExpenseDto(Expense expense) {
        ExpenseDto expenseDto = ExpenseDto.builder()
            .id(expense.getId())
            .date(expense.getDate())
            .description(expense.getDescription())
            .amount(expense.getAmount())
            .yearMonth(expense.getYearMonth())
            .build();
        return expenseDto;
    }

    
    public static Expense mapToExpense(ExpenseDto expenseDto) {
        Expense expense = Expense.builder()
            // .id(expenseDto.getId())
            .date(expenseDto.getDate())
            .description(expenseDto.getDescription())
            .amount(expenseDto.getAmount())
            .yearMonth(expenseDto.getYearMonth())
            .build();
        return expense;
    }
    
}
