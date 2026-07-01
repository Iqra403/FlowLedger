package com.flowledger.service;

import com.flowledger.dto.BankCashResponse;
import com.flowledger.dto.DashboardResponse;
import com.flowledger.dto.TransactionResponse;
import com.flowledger.dto.CashFlowForecastResponse;
import com.flowledger.dto.BankAccountDropdownResponse;

import java.util.List;

public interface DashboardService {

    DashboardResponse getDashboard();

    List<TransactionResponse> getRecentTransactions();
    List<TransactionResponse> getAllTransactions();

    List<BankCashResponse> getCashPositionByBank();
    List<BankAccountDropdownResponse> getBankAccounts();
    CashFlowForecastResponse getCashFlowForecast();

}