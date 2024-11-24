package dna.budget.helper.project.budgethelper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dna.budget.helper.project.budgethelper.dto.ExpenseDto;
import dna.budget.helper.project.budgethelper.models.ExpensesSummary;
import dna.budget.helper.project.budgethelper.services.ExpenseService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    
    private ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    @GetMapping("")
    public ResponseEntity<List<ExpenseDto>> listExpenses () {
        List<ExpenseDto> expenses = expenseService.findAllExpenses();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    @GetMapping("/{year-month}")
    public ResponseEntity<List<ExpenseDto>> listExpensesByYearMonth (@PathVariable("year-month") String yearMonth) {
        List<ExpenseDto> expenses = expenseService.findAllExpensesByYearMonth(yearMonth);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    @GetMapping("/sum/{year-month}")
    public ResponseEntity<Double> getTotalExpensesByYearMonth (@PathVariable("year-month") String yearMonth) {
        double sum = expenseService.sumExpensesByYearMonth(yearMonth);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }
    
    @GetMapping("/summary")
    public ResponseEntity<List<ExpensesSummary>> expensesSummary () {
        List<ExpensesSummary> expenses = expenseService.getExpensesSummary();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    @GetMapping("/summary/average")
    public ResponseEntity<Double> getSummaryAverage () {
        double avg = expenseService.getSummaryAverage();
        return new ResponseEntity<>(avg, HttpStatus.OK);
    }

    @PostMapping("/add-expense")
    public ResponseEntity<ExpenseDto> addExpense (@RequestBody ExpenseDto expenseDto) {
        ExpenseDto savedExpense = null;
        try{
            expenseService.addExpense(expenseDto);
        }catch(Exception e){
            return new ResponseEntity<>(expenseDto, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);

    }
     
}
