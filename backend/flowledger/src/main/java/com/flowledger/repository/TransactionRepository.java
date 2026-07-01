package com.flowledger.repository;

import com.flowledger.entity.Transaction;
import com.flowledger.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT COALESCE(SUM(t.amount),0) FROM Transaction t WHERE t.type=:type")
    Double getTotalAmountByType(TransactionType type);

    List<Transaction> findTop5ByOrderByDateDesc();
List<Transaction> findAllByOrderByDateDesc();
}