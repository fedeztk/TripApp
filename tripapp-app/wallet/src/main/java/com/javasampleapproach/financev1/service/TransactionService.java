package com.javasampleapproach.financev1.service;

import com.javasampleapproach.financev1.model.Transaction;
import com.javasampleapproach.financev1.model.TransactionDTO;
import java.util.List;
import java.util.UUID;

public interface TransactionService{

    Transaction saveNewTransaction(TransactionDTO transactionDTO, UUID uuid);
    Transaction saveNewTransaction(Transaction t);

    List<Transaction> getAllTransactions();

    void deleteTransactionsByUuid(UUID uuid);

    void deleteAllTransactions();

    List<Transaction> findByDebtorAndGroupId(String debtor,long groupId);

    List<Transaction> findByDebtorAndCreditorOrCreditorAndDebtorAndGroupId(String user1,String user2,long groupId);

    List<Transaction> findByDebtorOrCreditorAndGroupId(String user,long groupId);

    List<Transaction> findByCreditorAndGroupId(String creditor, long groupId);

    List<Transaction> findByCreditor(String creditor);

    List<Transaction> findByUuid(UUID uuid);
}
