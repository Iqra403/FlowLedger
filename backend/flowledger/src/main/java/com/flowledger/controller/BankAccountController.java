package com.flowledger.controller;

import com.flowledger.dto.BankAccountRequest;
import com.flowledger.service.BankAccountService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bank")
public class BankAccountController {

    private final BankAccountService bankAccountService;

    public BankAccountController(BankAccountService bankAccountService) {
        this.bankAccountService = bankAccountService;
    }

    @PostMapping("/add")
    public String addBankAccount(@RequestBody BankAccountRequest request) {
        return bankAccountService.addBankAccount(request);
    }
}