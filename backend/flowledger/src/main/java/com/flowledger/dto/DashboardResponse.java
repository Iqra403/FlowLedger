package com.flowledger.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private Double totalCash;

    private Double totalIncome;

    private Double totalExpense;

    private Long totalBankAccounts;

}
