package com.flowledger.controller;

import com.flowledger.dto.BankCashResponse;
import com.flowledger.dto.CashFlowForecastResponse;
import com.flowledger.dto.DashboardResponse;
import com.flowledger.dto.TransactionResponse;
import com.flowledger.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.flowledger.dto.BankAccountDropdownResponse;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardResponse getDashboard() {

        System.out.println(">>> DASHBOARD ENDPOINT HIT <<<");

        return dashboardService.getDashboard();
    }

    @GetMapping("/recent-transactions")
    public List<TransactionResponse> getRecentTransactions() {

        System.out.println(">>> RECENT TRANSACTIONS ENDPOINT HIT <<<");

        return dashboardService.getRecentTransactions();
    }
    @GetMapping("/all-transactions")
public List<TransactionResponse> getAllTransactions() {

    System.out.println(">>> ALL TRANSACTIONS ENDPOINT HIT <<<");

    return dashboardService.getAllTransactions();
}
   


    @GetMapping("/cash-position")
    public List<BankCashResponse> getCashPositionByBank() {

        System.out.println(">>> CASH POSITION ENDPOINT HIT <<<");

        return dashboardService.getCashPositionByBank();
    }
@GetMapping("/bank-dropdown")
public List<BankAccountDropdownResponse> getBankAccounts() {

    return dashboardService.getBankAccounts();

}
    @GetMapping("/cash-flow-forecast")
    public CashFlowForecastResponse getCashFlowForecast() {

        System.out.println(">>> CASH FLOW FORECAST ENDPOINT HIT <<<");

        return dashboardService.getCashFlowForecast();
    }
}