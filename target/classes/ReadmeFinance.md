**Legenda Microservizio Finance**

Mappatura classi ita-eng:

**Classe Finance**:
    
<!--- transaction (entità minima no transazioni che wrappano transazioni) -->
    
saldo --> transaction


**-DB finance:**

db name --> dbFinance
table name: saldo --> transaction 
column name: importo --> amount
column name: creditore --> creditor
column name: debitore --> debtor
column name: id --> id
column name: groupID --> groupID

dal front end ricevo transazione singola o aggregata in json:

caso spesa aggregata (un creditore + debitori):

-spesa aggregata --> transactionAggregate

    {		
        "creditor":"Name",
        "debtorAmountList": [{"debtor1":amount1},{"debtor2":amount2}]
    }
-spesa singola --> transaction

    {
        "creditor":"name",
        "debtor": "name",
        "amount": value
    }


Doppio id:
1 group id (per identificare che la spesa appartiene a quel gruppo)
2 generato al momento della suddivisione della 
transazione aggregata in singole transazioni 
(questo di serve a risalire alla spesa condivisa )
implementato con UUID v4

