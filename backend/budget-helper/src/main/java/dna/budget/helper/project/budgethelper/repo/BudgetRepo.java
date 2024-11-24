package dna.budget.helper.project.budgethelper.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import dna.budget.helper.project.budgethelper.models.Budget;

public interface BudgetRepo extends JpaRepository<Budget, String> {
    
}
