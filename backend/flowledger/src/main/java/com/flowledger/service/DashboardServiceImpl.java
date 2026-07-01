package com.flowledger.service;

import com.flowledger.dto.*;
import com.flowledger.entity.BankAccount;
import com.flowledger.entity.Transaction;
import com.flowledger.entity.User;
import com.flowledger.repository.BankAccountRepository;
import com.flowledger.repository.TransactionRepository;
import com.flowledger.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final TransactionRepository transactionRepository;
    private final BankAccountRepository bankAccountRepository;
    private final UserRepository userRepository;

    public DashboardServiceImpl(TransactionRepository transactionRepository,
                                BankAccountRepository bankAccountRepository,
                                UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.userRepository = userRepository;
    }

    // ---------------- DASHBOARD ----------------

    @Override
    public DashboardResponse getDashboard() {

        double totalCash = bankAccountRepository.findAll()
                .stream()
                .mapToDouble(b -> b.getCurrentBalance() == null ? 0 : b.getCurrentBalance())
                .sum();

        double totalIncome = transactionRepository.findAll()
                .stream()
                .filter(t -> t.getType().name().equals("INCOME"))
                .mapToDouble(t -> t.getAmount() == null ? 0 : t.getAmount())
                .sum();

        double totalExpense = transactionRepository.findAll()
                .stream()
                .filter(t -> t.getType().name().equals("EXPENSE"))
                .mapToDouble(t -> t.getAmount() == null ? 0 : t.getAmount())
                .sum();

        long totalBanks = bankAccountRepository.count();

        return new DashboardResponse(
                totalCash,
                totalIncome,
                totalExpense,
                totalBanks
        );
    }

    // ---------------- RECENT TRANSACTIONS ----------------

    @Override
    public List<TransactionResponse> getRecentTransactions() {

        return transactionRepository.findAll()
                .stream()
                .limit(5)
                .map(t -> new TransactionResponse(
                        t.getId(),
                        t.getBankAccount().getBankName(),
                        t.getType().name(),
                        t.getAmount(),
                        t.getCategory().name(),
                        t.getDescription(),
                        t.getDate()
                ))
                .collect(Collectors.toList());
    }

    // ---------------- ALL TRANSACTIONS ----------------

    @Override
    public List<TransactionResponse> getAllTransactions() {

        return transactionRepository.findAll()
                .stream()
                .map(t -> new TransactionResponse(
                        t.getId(),
                        t.getBankAccount().getBankName(),
                        t.getType().name(),
                        t.getAmount(),
                        t.getCategory().name(),
                        t.getDescription(),
                        t.getDate()
                ))
                .collect(Collectors.toList());
    }

    // ---------------- CASH POSITION ----------------

    @Override
    public List<BankCashResponse> getCashPositionByBank() {

        return bankAccountRepository.findAll()
                .stream()
                .map(b -> new BankCashResponse(
                        b.getBankName(),
                        b.getCurrentBalance() == null ? 0 : b.getCurrentBalance()
                ))
                .collect(Collectors.toList());
    }

    // ---------------- BANK DROPDOWN ----------------

    @Override
    public List<BankAccountDropdownResponse> getBankAccounts() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bankAccountRepository.findByUser(user)
                .stream()
                .map(b -> new BankAccountDropdownResponse(
                        b.getId(),
                        b.getBankName()
                ))
                .collect(Collectors.toList());
    }

    // ---------------- CASH FLOW FORECAST ----------------

    @Override
    public CashFlowForecastResponse getCashFlowForecast() {

        double currentCash = bankAccountRepository.findAll()
                .stream()
                .mapToDouble(b -> b.getCurrentBalance() == null ? 0 : b.getCurrentBalance())
                .sum();

        double expectedInflows = transactionRepository.findAll()
                .stream()
                .filter(t -> t.getType().name().equals("INCOME"))
                .mapToDouble(t -> t.getAmount() == null ? 0 : t.getAmount())
                .sum();

        double expectedOutflows = transactionRepository.findAll()
                .stream()
                .filter(t -> t.getType().name().equals("EXPENSE"))
                .mapToDouble(t -> t.getAmount() == null ? 0 : t.getAmount())
                .sum();

        double projectedCash = currentCash + expectedInflows - expectedOutflows;

        return new CashFlowForecastResponse(
                currentCash,
                expectedInflows,
                expectedOutflows,
                projectedCash
        );
    }
}