package com.flowledger.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {

    private Long id;   // ✅ IMPORTANT for delete

    private String bankName;

    private String type;

    private Double amount;

    private String category;

    private String description;

    private LocalDate date;
}