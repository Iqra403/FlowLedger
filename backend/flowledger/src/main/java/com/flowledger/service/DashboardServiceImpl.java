package com.flowledger.service;

import com.flowledger.dto.DashboardResponse;
import com.flowledger.dto.TransactionResponse;
import com.flowledger.enums.TransactionType;
import com.flowledger.repository.BankAccountRepository;
import com.flowledger.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;

    public DashboardServiceImpl(BankAccountRepository bankAccountRepository,
                                TransactionRepository transactionRepository) {
        this.bankAccountRepository = bankAccountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        Double totalCash = bankAccountRepository.findAll()
                .stream()
                .mapToDouble(account -> account.getCurrentBalance())
                .sum();

        Double totalIncome =
                transactionRepository.getTotalAmountByType(TransactionType.INCOME);

        Double totalExpense =
                transactionRepository.getTotalAmountByType(TransactionType.EXPENSE);

        Long totalBankAccounts =
                bankAccountRepository.count();

        return new DashboardResponse(
                totalCash,
                totalIncome,
                totalExpense,
                totalBankAccounts
        );
    }

    @Override
    public List<TransactionResponse> getRecentTransactions() {

        return transactionRepository.findTop5ByOrderByDateDesc()
                .stream()
                .map(transaction -> new TransactionResponse(
                        transaction.getBankAccount().getBankName(),
                        transaction.getType().name(),
                        transaction.getAmount(),
                        transaction.getCategory(),
                        transaction.getDescription(),
                        transaction.getDate()
                ))
                .collect(Collectors.toList());
    }
}