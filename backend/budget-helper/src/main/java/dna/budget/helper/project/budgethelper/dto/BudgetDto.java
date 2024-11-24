package dna.budget.helper.project.budgethelper.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDto {
    private String yearMonth;
    private double budget;
}
