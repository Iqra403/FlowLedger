package com.flowledger.entity;

import com.flowledger.enums.TransactionType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import com.flowledger.enums.TransactionCategory;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private Double amount;

    @Enumerated(EnumType.STRING)
private TransactionCategory category;

    private String description;

    private LocalDate date;
    
    @ManyToOne
@JoinColumn(name = "bank_account_id")
private BankAccount bankAccount;
}