package dna.budget.helper.project.budgethelper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dna.budget.helper.project.budgethelper.dto.BudgetDto;
import dna.budget.helper.project.budgethelper.services.BudgetService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    private BudgetService budgetService;

    @Autowired
    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }


    @GetMapping("")
    public ResponseEntity<List<BudgetDto>> getBudgets() {
        List<BudgetDto> budgets = budgetService.getBudgets();
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

    @GetMapping("/{year-month}")
    public ResponseEntity<BudgetDto> getBudget(@PathVariable("year-month") String yearMonth) {
        BudgetDto budget = null;
        try {
            budget = budgetService.getBudget(yearMonth);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(budget, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(budget, HttpStatus.OK);
    }

    @PutMapping("/update-budget")
    public ResponseEntity<BudgetDto> updateBudget(@RequestBody BudgetDto budgetDto) {
        BudgetDto updatedBudget = null;
        try {
            updatedBudget = budgetService.updateBudget(budgetDto);
        } catch (Exception e) {
            e.printStackTrace();

            return new ResponseEntity<>(budgetDto, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updatedBudget, HttpStatus.OK);
    }

    @PostMapping("/add-default")
    public ResponseEntity<BudgetDto> addBudget(@RequestBody BudgetDto budgetDto) {
        BudgetDto newBudget = null;
        try {
            newBudget = budgetService.addDefaultBudget(budgetDto);
        } catch (Exception e) {
            return new ResponseEntity<>(budgetDto, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(newBudget, HttpStatus.OK);
    }
    
}
