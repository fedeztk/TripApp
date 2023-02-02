package com.javasampleapproach.financev1.repo;

import com.javasampleapproach.financev1.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction,Long>{
    List<Transaction> findByGroupId(long groupId);

    List<com.javasampleapproach.financev1.model.Transaction> findByUuid(UUID uuid);

    void deleteByUuid(UUID uuid);

    List<Transaction> findByDebtorAndGroupId(String debtor,long groupId);

    List<Transaction> findByDebtorAndCreditorOrCreditorAndDebtorAndGroupId(String user1, String user2, String user22, String user11,long groupId);

    List<Transaction> findByDebtorOrCreditorAndGroupId(String user, String user1, long groupId);

    List<Transaction> findByCreditorAndGroupId(String creditor, long groupId);

    List<Transaction> findByCreditor(String creditor);
}
