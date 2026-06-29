package com.flowledger.service;

import com.flowledger.dto.TransactionRequest;
import com.flowledger.entity.BankAccount;
import com.flowledger.entity.Transaction;
import com.flowledger.enums.TransactionType;
import com.flowledger.repository.BankAccountRepository;
import com.flowledger.repository.TransactionRepository;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final BankAccountRepository bankAccountRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository,
                                  BankAccountRepository bankAccountRepository) {
        this.transactionRepository = transactionRepository;
        this.bankAccountRepository = bankAccountRepository;
    }

    @Override
    public String addTransaction(TransactionRequest request) {

        // 1. Find Bank Account
        BankAccount bankAccount = bankAccountRepository.findById(request.getBankAccountId())
                .orElseThrow(() -> new RuntimeException("Bank Account not found"));

        // 2. Create Transaction
        Transaction transaction = Transaction.builder()
                .type(request.getType())
                .amount(request.getAmount())
                .category(request.getCategory())   // ✅ FIXED (no valueOf)
                .description(request.getDescription())
                .date(request.getDate())
                .bankAccount(bankAccount)
                .build();

        // 3. Update Bank Balance
        if (request.getType() == TransactionType.INCOME) {
            bankAccount.setCurrentBalance(
                    bankAccount.getCurrentBalance() + request.getAmount()
            );
        } else {
            bankAccount.setCurrentBalance(
                    bankAccount.getCurrentBalance() - request.getAmount()
            );
        }

        // 4. Save changes
        bankAccountRepository.save(bankAccount);
        transactionRepository.save(transaction);

        return "Transaction Added Successfully";
    }
}