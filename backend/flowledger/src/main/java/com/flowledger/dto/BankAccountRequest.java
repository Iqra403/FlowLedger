package com.flowledger.dto;

import lombok.Data;

@Data
public class BankAccountRequest {

    private String bankName;
    private String accountNumber;
    private Double currentBalance;
    private String currency;

}