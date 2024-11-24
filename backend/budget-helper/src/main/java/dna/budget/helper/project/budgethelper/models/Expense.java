package dna.budget.helper.project.budgethelper.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String date;
    private String description;
    private double amount;
    @Column(name="year_month")
    private String yearMonth;
    
}
// @SqlResultSetMapping(name = "ExpensesSummary",
//         classes = {
//                 @ConstructorResult(targetClass = dna.budget.helper.project.budgethelper.models,
//                         columns = {
//                                 @ColumnResult(name = "year_month"),
//                                 @ColumnResult(name = "budget", type = Double.class),
//                                 @ColumnResult(name = "total", type = Double.class),
//                                 @ColumnResult(name = "difference", type = Double.class)})
//         })

