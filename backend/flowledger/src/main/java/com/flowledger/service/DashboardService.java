package com.flowledger.service;

import com.flowledger.dto.DashboardResponse;
import com.flowledger.dto.TransactionResponse;

import java.util.List;

public interface DashboardService {

    DashboardResponse getDashboard();

    List<TransactionResponse> getRecentTransactions();

}