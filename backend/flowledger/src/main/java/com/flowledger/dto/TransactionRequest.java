package com.flowledger.dto;

import com.flowledger.enums.TransactionCategory;
import com.flowledger.enums.TransactionType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionRequest {

    private Long bankAccountId;

    private TransactionType type;

    private Double amount;

    private TransactionCategory category;

    private String description;

    private LocalDate date;
}