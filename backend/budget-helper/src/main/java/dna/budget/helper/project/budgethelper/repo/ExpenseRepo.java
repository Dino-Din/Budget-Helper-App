package dna.budget.helper.project.budgethelper.repo;

import dna.budget.helper.project.budgethelper.models.Expense;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpenseRepo extends JpaRepository<Expense, Long>{
    @Query(value = "SELECT * FROM expenses WHERE year_month = :yearMonth", nativeQuery = true)
    List<Expense> findAllExpensesByYearMonth(@Param("yearMonth") String yearMonth);

    @Query(value = "SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE year_month = :yearMonth", nativeQuery = true)
    double sumExpensesByYearMonth(@Param("yearMonth") String yearMonth);
    
    
}
