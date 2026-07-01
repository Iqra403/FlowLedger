package com.flowledger.service;

import com.flowledger.dto.TransactionRequest;
import com.flowledger.dto.TransactionResponse;
import com.flowledger.entity.BankAccount;
import com.flowledger.entity.Transaction;
import com.flowledger.enums.TransactionType;
import com.flowledger.repository.BankAccountRepository;
import com.flowledger.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

        BankAccount bankAccount = bankAccountRepository.findById(request.getBankAccountId())
                .orElseThrow(() -> new RuntimeException("Bank Account not found"));

        Transaction transaction = Transaction.builder()
                .type(request.getType())
                .amount(request.getAmount())
                .category(request.getCategory())
                .description(request.getDescription())
                .date(request.getDate())
                .bankAccount(bankAccount)
                .build();

        if (request.getType() == TransactionType.INCOME) {
            bankAccount.setCurrentBalance(
                    bankAccount.getCurrentBalance() + request.getAmount()
            );
        } else {
            bankAccount.setCurrentBalance(
                    bankAccount.getCurrentBalance() - request.getAmount()
            );
        }

        bankAccountRepository.save(bankAccount);
        transactionRepository.save(transaction);

        return "Transaction Added Successfully";
    }

    @Override
    public List<TransactionResponse> getAllTransactions() {

        return transactionRepository.findAllByOrderByDateDesc()
                .stream()
                .map(t -> new TransactionResponse(
                        t.getId(),   // ✅ NEW
                        t.getBankAccount().getBankName(),
                        t.getType().name(),
                        t.getAmount(),
                        t.getCategory().name(),
                        t.getDescription(),
                        t.getDate()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public String deleteTransaction(Long id) {

        Transaction t = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        BankAccount account = t.getBankAccount();

        // reverse balance
        if (t.getType() == TransactionType.INCOME) {
            account.setCurrentBalance(account.getCurrentBalance() - t.getAmount());
        } else {
            account.setCurrentBalance(account.getCurrentBalance() + t.getAmount());
        }

        bankAccountRepository.save(account);
        transactionRepository.delete(t);

        return "Transaction Deleted Successfully";
    }
}