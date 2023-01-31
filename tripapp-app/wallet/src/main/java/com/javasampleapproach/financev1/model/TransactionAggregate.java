package com.javasampleapproach.financev1.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionAggregate {
    /**
     * components:
     * -creditor
     * -list<UserAmount> it contains all debtor name and amount
     */


    private String creditor;
    private List<UserIdAmount> userIdAmountList;
    private long groupId;
    private List<String> userIdList;

    /**
     * receive an aggregate transaction and return a list of single transaction
     */
    public List<TransactionDTO> splitInSingleTransaction(){
        List<TransactionDTO> lt = new ArrayList<>();
        UUID uuid = UUID.randomUUID();
        for(UserIdAmount ua : this.userIdAmountList){
            TransactionDTO t = new TransactionDTO(ua.getAmount(),ua.getUserId(),this.creditor,this.groupId);
            lt.add(t);};
        return lt;
    }

    /**
     * Calculate balance of all transaction returning a Float that contains the total balance
     * @param tl -> list of transaction
     * @return a transaction with the total balance
     */
    public static Float balanceTransactions(List<Transaction> tl, String username) {
        float balance = 0;
        for(Transaction t: tl){
            if(t.getCreditor().equalsIgnoreCase(username))balance += t.getAmount();
            else balance -= t.getAmount();
        }return balance;
    }

    /**
     * it receives in input a list of debt vs a user and generate a list with a total debt
     * for each user vs a specific user
     * @param debtorList
     * @return a list of object debtor - amount
     */
    public static List<UserIdAmount> generateDebtorAmountList(List<Transaction> debtorList,List<String> userIdList){
        List<UserIdAmount> l = new ArrayList<>();
        for(String user: userIdList){
            float amount = 0;
            for(Transaction t: debtorList) if(user.equalsIgnoreCase(t.getDebtor())) amount += t.getAmount();
            l.add(new UserIdAmount(user,amount));
        }
        return l;
    }

    /**
     * it receives in input a list of credit vs a user and generate a list with a total credit
     * for each user vs a specific user
     * @param creditorList
     * @return alist of object creditor - amount
     */
    public static List<UserIdAmount> generateCreditorAmountList(List<Transaction> creditorList,List<String> userIdList){
        List<UserIdAmount> l = new ArrayList<>();
        for(String user: userIdList){
            float amount = 0;
            for(Transaction t: creditorList) if(user.equalsIgnoreCase(t.getCreditor())) amount += t.getAmount();
            l.add(new UserIdAmount(user,amount));
        }
        return l;
    }


}
