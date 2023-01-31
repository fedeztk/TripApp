package com.javasampleapproach.financev1.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {
    private float amount;
    private String debtor;
    private String creditor;
    private long groupId;
}