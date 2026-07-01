package com.flowledger.service;

import com.flowledger.dto.BankAccountRequest;
import com.flowledger.entity.BankAccount;
import com.flowledger.entity.User;
import com.flowledger.repository.BankAccountRepository;
import com.flowledger.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class BankAccountServiceImpl implements BankAccountService {

    private final BankAccountRepository bankAccountRepository;
    private final UserRepository userRepository;

    public BankAccountServiceImpl(BankAccountRepository bankAccountRepository,
                                  UserRepository userRepository) {
        this.bankAccountRepository = bankAccountRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String addBankAccount(BankAccountRequest request) {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BankAccount account = BankAccount.builder()
                .bankName(request.getBankName())
                .accountNumber(request.getAccountNumber())
                .ifscCode(request.getIfscCode())
                .currentBalance(request.getOpeningBalance())
                .currency(request.getCurrency())
                .user(user)
                .build();

        bankAccountRepository.save(account);

        return "Bank Account Added Successfully";
    }
}