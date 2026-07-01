package com.flowledger.dto;

public class BankAccountDropdownResponse {

    private Long id;
    private String bankName;

    public BankAccountDropdownResponse(Long id, String bankName) {
        this.id = id;
        this.bankName = bankName;
    }

    public Long getId() {
        return id;
    }

    public String getBankName() {
        return bankName;
    }
}