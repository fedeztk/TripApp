package com.javasampleapproach.financev1.service;

import com.javasampleapproach.financev1.model.Transaction;
import com.javasampleapproach.financev1.model.TransactionDTO;
import com.javasampleapproach.financev1.repo.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService{

    private final TransactionRepository transactionRepository;

    @Override
    public Transaction saveNewTransaction(TransactionDTO transactionDTO, UUID uuid) {
        return transactionRepository.save(convertTransactionDTOToTransaction(transactionDTO,uuid));
    }

    @Override
    public Transaction saveNewTransaction(Transaction t) {
        return transactionRepository.save(t);
    }


    @Override
    public List<Transaction> getAllTransactions() {

        List<Transaction> transactions = new ArrayList<>();
        transactionRepository.findAll().forEach(transactions::add);
        return transactions;
    }

    public List<Transaction> getAllTransactionsByGroupId(long groupId){
        return transactionRepository.findByGroupId(groupId);
    }

    @Override
    @Transactional
    public void deleteTransactionsByUuid(UUID uuid) {
        transactionRepository.deleteByUuid(uuid);
    }

    @Override
    public void deleteAllTransactions() {
        transactionRepository.deleteAll();
    }

    @Override
    public List<Transaction> findByDebtorAndGroupId(String debtor,long groupId) {
        return transactionRepository.findByDebtorAndGroupId(debtor,groupId);
    }

    @Override
    public List<Transaction> findByDebtorAndCreditorOrCreditorAndDebtorAndGroupId(String user1, String user2,long groupId) {
        return transactionRepository.findByDebtorAndCreditorOrCreditorAndDebtorAndGroupId(user1,user2,user2,user1,groupId);
    }

    @Override
    public List<Transaction> findByDebtorOrCreditorAndGroupId(String user, long groupId) {
        return transactionRepository.findByDebtorOrCreditorAndGroupId(user,user,groupId);
    }

    @Override
    public List<Transaction> findByCreditorAndGroupId(String creditor, long groupId) {
        return transactionRepository.findByCreditorAndGroupId(creditor,groupId);
    }

    @Override
    public List<Transaction> findByCreditor(String creditor) {
        return transactionRepository.findByCreditor(creditor);
    }

    @Override
    public List<Transaction> findByUuid(UUID uuid) {
        return transactionRepository.findByUuid(uuid);
    }

    private Transaction convertTransactionDTOToTransaction(TransactionDTO transactionDTO, UUID uuid) {
        Transaction transaction = new Transaction();
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setCreditor(transactionDTO.getCreditor());
        transaction.setDebtor(transactionDTO.getDebtor());
        transaction.setGroupId(transactionDTO.getGroupId());
        transaction.setUuid(uuid);
        return transaction;
    }

}
