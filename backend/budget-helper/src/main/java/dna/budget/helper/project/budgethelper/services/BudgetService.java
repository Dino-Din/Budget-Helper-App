package dna.budget.helper.project.budgethelper.services;
import dna.budget.helper.project.budgethelper.dto.BudgetDto;
import java.util.List;

public interface BudgetService {
    List<BudgetDto> getBudgets();
    BudgetDto updateBudget(BudgetDto budgetDto) throws Exception;
    BudgetDto getBudget(String yearMonth) throws Exception;
    BudgetDto addDefaultBudget(BudgetDto budgetDto) throws Exception;
}
