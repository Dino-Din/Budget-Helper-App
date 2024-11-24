package dna.budget.helper.project.budgethelper.mapper;

import dna.budget.helper.project.budgethelper.dto.BudgetDto;
import dna.budget.helper.project.budgethelper.models.Budget;

public class BudgetMapper {

    public static BudgetDto mapToBudgetDto(Budget b) {
        BudgetDto budgetDto = BudgetDto.builder()
            .yearMonth(b.getYearMonth())
            .budget(b.getBudget())
            .build();
        return budgetDto;
    }

    public static Budget mapToBudget(BudgetDto budgetDto) {
        Budget b = Budget.builder()
            .yearMonth(budgetDto.getYearMonth())
            .budget(budgetDto.getBudget())
            .build();
        return b;
    }
    
}
