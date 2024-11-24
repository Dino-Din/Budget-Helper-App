package dna.budget.helper.project.budgethelper.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import dna.budget.helper.project.budgethelper.models.ExpensesSummary;

public interface ExpensesSummaryRepo extends JpaRepository<ExpensesSummary, String>{

    @Query(value = "SELECT * FROM getExpensesSummary()", nativeQuery = true)
    List<ExpensesSummary> getExpensesSummary();

    @Query(value = "SELECT AVG(total) FROM getExpensesSummary()", nativeQuery = true)
    double getSummaryAverage();
    
}
