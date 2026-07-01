package com.flowledger.controller;

import com.flowledger.dto.TransactionRequest;
import com.flowledger.dto.TransactionResponse;
import com.flowledger.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/add")
    public String addTransaction(@RequestBody TransactionRequest request) {
        return transactionService.addTransaction(request);
    }

    @GetMapping
    public List<TransactionResponse> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {
        return transactionService.deleteTransaction(id);
    }
}