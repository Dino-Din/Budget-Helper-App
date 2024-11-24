package dna.budget.helper.project.budgethelper.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import dna.budget.helper.project.budgethelper.dto.BudgetDto;
import dna.budget.helper.project.budgethelper.mapper.BudgetMapper;
import dna.budget.helper.project.budgethelper.models.Budget;
import dna.budget.helper.project.budgethelper.repo.BudgetRepo;
import dna.budget.helper.project.budgethelper.services.BudgetService;

@Service
public class BudgetServiceImpl implements BudgetService {

    private BudgetRepo budgetRepo;

    @Autowired
    public BudgetServiceImpl(BudgetRepo budgetRepo) {
        this.budgetRepo = budgetRepo;
    }

    @Override
    public List<BudgetDto> getBudgets() {
        List<Budget> budgets = budgetRepo.findAll(Sort.by(Sort.Direction.DESC, "yearMonth"));
        return budgets.stream().map((b) -> BudgetMapper.mapToBudgetDto(b)).collect(Collectors.toList());
    }

    @Override
    public BudgetDto updateBudget(BudgetDto budgetDto) throws Exception {

        Budget newBudget = BudgetMapper.mapToBudget(budgetDto);

        Budget budget = budgetRepo.findById(budgetDto.getYearMonth()).map(b -> {
                            b.setBudget(newBudget.getBudget());
                            return budgetRepo.save(b);
                        })
                        .orElseGet(() -> {
                            if (newBudget != null) return budgetRepo.save(newBudget);
                            else return null;
                        });

        return BudgetMapper.mapToBudgetDto(budget);
    }

    @Override
    public BudgetDto addDefaultBudget(BudgetDto budgetDto) throws Exception {

        Budget newBudget = BudgetMapper.mapToBudget(budgetDto);
        Budget savedBudget;

        Optional<Budget> budget = budgetRepo.findById(newBudget.getYearMonth());
        if (budget.isEmpty()) {
            savedBudget = budgetRepo.save(newBudget);
            return BudgetMapper.mapToBudgetDto(savedBudget);
        } else {
            return BudgetMapper.mapToBudgetDto(budget.get());
        }

        
    }

    @Override
    public BudgetDto getBudget(String yearMonth) throws Exception{
        Optional<Budget> budget = budgetRepo.findById(yearMonth != null ? yearMonth : "");
        if (budget.isEmpty()) {
            return new BudgetDto();

        } else{
            Budget realBudget = budget.get();
            return BudgetMapper.mapToBudgetDto(realBudget);
        }
        
 
    }
        
    
    
}
