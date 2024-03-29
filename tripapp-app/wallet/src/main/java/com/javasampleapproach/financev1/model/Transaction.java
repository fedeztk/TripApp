package com.javasampleapproach.financev1.model;

import lombok.*;
import javax.persistence.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transaction")
public class Transaction {
    /**
     *  transaction is debt/credit between two users
     *  univoque id for group of transactions(1 id represent a group of transaction) autogenerated
     *  UUId v4 generated randomically
     * Constructor
     * @param amount -> amount of debt/credit
     * @param creditor -> self explaining
     * @param debtor ->  self explaining
     * @param groupId -> ID that represent a group of travelers
     * @param uuid -> identificator for related transactions
     */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;
    @Column(name = "uuid")
    private UUID uuid;

    @Column(name = "amount")
    private float amount;

    @Column(name = "debtor")
    private String debtor;

    @Column(name = "creditor")
    private String creditor;

    @Column(name = "groupId")
    private long groupId;


    /*public Transaction(UUID uuid, float amount, String debtor, String creditor, long groupId) {
        this.uuid = uuid;
        this.amount = amount;
        this.creditor = creditor;
        this.debtor = debtor;
        this.groupId = groupId;
    }*/
}
