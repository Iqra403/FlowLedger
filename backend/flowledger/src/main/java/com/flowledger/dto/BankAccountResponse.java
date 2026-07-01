package com.flowledger.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BankAccountResponse {

    private Long id;

    private String bankName;

    private String accountNumber;

    private String ifscCode;

    private Double currentBalance;

    private String currency;
}