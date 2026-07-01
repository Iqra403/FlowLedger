package com.flowledger.service;

import com.flowledger.dto.TransactionRequest;
import com.flowledger.dto.TransactionResponse;

import java.util.List;

public interface TransactionService {

    String addTransaction(TransactionRequest request);

    List<TransactionResponse> getAllTransactions();

    String deleteTransaction(Long id);
}