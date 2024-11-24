package dna.budget.helper.project.budgethelper.services.impl;

import dna.budget.helper.project.budgethelper.Exceptions.ResourceNotFoundException;
import dna.budget.helper.project.budgethelper.dto.ExpenseDto;
import dna.budget.helper.project.budgethelper.mapper.ExpenseMapper;
import dna.budget.helper.project.budgethelper.models.Expense;
import dna.budget.helper.project.budgethelper.models.ExpensesSummary;
import dna.budget.helper.project.budgethelper.repo.ExpenseRepo;
import dna.budget.helper.project.budgethelper.repo.ExpensesSummaryRepo;
import dna.budget.helper.project.budgethelper.services.ExpenseService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseServiceImpl implements ExpenseService{

    private ExpenseRepo expenseRepo;
    private ExpensesSummaryRepo summaryRepo;

    @Autowired
    public ExpenseServiceImpl(ExpenseRepo expenseRepo, ExpensesSummaryRepo summaryRepo){ // or use @AllArgsConstructor
        this.expenseRepo = expenseRepo;
        this.summaryRepo = summaryRepo;

    }

    @Override
    public List<ExpenseDto> findAllExpenses() {
        List<Expense> expenses = expenseRepo.findAll();
        return expenses.stream().map((expense) -> ExpenseMapper.mapToExpenseDto(expense)).collect(Collectors.toList());
    }

    @Override
    public ExpenseDto addExpense(ExpenseDto expenseDto) throws Exception{
        //expenseDto.setId((long) 1);
        Expense expense = ExpenseMapper.mapToExpense(expenseDto); 
        Expense savedExpense = expenseRepo.save(expense);
        return ExpenseMapper.mapToExpenseDto(savedExpense);
    }

    @Override
    public List<ExpenseDto> findAllExpensesByYearMonth(String yearMonth) {
        List<Expense> expenses = expenseRepo.findAllExpensesByYearMonth(yearMonth);
        return expenses.stream().map((expense) -> ExpenseMapper.mapToExpenseDto(expense)).collect(Collectors.toList());
    }

    @Override
    public double sumExpensesByYearMonth(String yearMonth) {
        double total = expenseRepo.sumExpensesByYearMonth(yearMonth);
        return total;
    }

    @Override
    public List<ExpensesSummary> getExpensesSummary() {
        List<ExpensesSummary> expensesSummaryDto = summaryRepo.getExpensesSummary();
        return expensesSummaryDto;
    }

    @Override
    public double getSummaryAverage() {
        double getSummaryAverage = summaryRepo.getSummaryAverage();
        return getSummaryAverage;
    }
    
}
