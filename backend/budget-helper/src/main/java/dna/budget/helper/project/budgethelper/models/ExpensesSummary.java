package dna.budget.helper.project.budgethelper.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ExpensesSummary {
    @Id
    @Column(name="year_month")
    private String yearMonth;
    private double budget;
    private double total;
    private double difference;
    
}
