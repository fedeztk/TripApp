package com.javasampleapproach.financev1.controller;

import com.javasampleapproach.financev1.model.*;
import com.javasampleapproach.financev1.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/finance")
//@RequestMapping("/api/v1")

public class FinanceController {
	private final TransactionService transactionService;

	@GetMapping("/transactions")
	@CrossOrigin
	public ResponseEntity<?> getAllTransactions() {
		try {
			List<Transaction> transactions = transactionService.getAllTransactions();
			return ResponseEntity.ok(transactions);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	/**
	 * Get all transactions by groupid
	 */
	@GetMapping("/transactionsByGroupId")
	public ResponseEntity<?> getAllTransactionsByGroupId(@RequestParam("groupid")long groupId){
		try {
			List<Transaction> transactions = transactionService.getAllTransactionsByGroupId(groupId);
			return ResponseEntity.ok(transactions);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}


	/**
	 * Receives a single transaction from front-end and saves it to db
	 * @return transaction
	 */
	@PostMapping(value = "/transactions/create")
	@CrossOrigin
	public ResponseEntity<?> postTransaction(@RequestBody TransactionDTO transactionDTO){
		try {
			Transaction transaction = transactionService.saveNewTransaction(transactionDTO, UUID.randomUUID());
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	/**
	 * receive aggregate transaction and call method to generate List of single transaction
	 * then call save transaction  to save them inside db
	 */
	@PostMapping(value = "/transactionAggregate/create")
	@CrossOrigin
	public ResponseEntity<?> postTransactionAggregate(@RequestBody TransactionAggregate transactionAggregate){
		try {
			List<TransactionDTO> tl = transactionAggregate.splitInSingleTransaction();
			UUID uuid = UUID.randomUUID();
			for(TransactionDTO t: tl)transactionService.saveNewTransaction(t,uuid);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	/**
	 *  Delete group of transaction belonging to the same uuid
	 */
	//@DeleteMapping("/transactions/deleteByUuid")
	@DeleteMapping("/transactions/deleteByUuid")
	@CrossOrigin
	public ResponseEntity<String> deleteGroupOfTransaction(@RequestParam("uuid") UUID uuid){
		System.out.println("Delete group of transaction with uuid = " + uuid + "...");
		transactionService.deleteTransactionsByUuid(uuid);
		return new ResponseEntity<>("Group of Transaction has been deleted!", HttpStatus.OK);
	}


	/**
	 * Delete all transactions from db
	 * @return
	 */
	@DeleteMapping("/transactions/delete")
	public ResponseEntity<String> deleteAllTransactions(){
		System.out.println("Delete All Transactions...");
		transactionService.deleteAllTransactions();
		return new ResponseEntity<>("All transactions have been deleted!", HttpStatus.OK);
	}

	/**
	 * Retrieves from db a list of transaction with debtor field matching with debtor path variable
	 * (and matching the group id ) --> it means all debts for a user in a specific group
	 */
	//@GetMapping(value = "transactions/debtor/{userid}/{groupid}")
	@GetMapping(value = "transactions/debtor")
	public ResponseEntity<?> findByDebtorAndGroupId(@RequestHeader("userId") String userid,@RequestParam("groupid") long groupId){
		try {
			List<Transaction> transactions = transactionService.findByDebtorAndGroupId(userid,groupId);
			return ResponseEntity.ok(transactions);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	/**
	 * This method will balance all between 2 person
	 */
	//@GetMapping(value = "transactions/positionVsUser/{userid1}/{userid2}/{groupId}")
	@GetMapping(value = "transactions/positionVsUser")
	public ResponseEntity<?> calculateUserPostionVsOtherUser(@RequestHeader("userId") String userid1, @RequestParam("userid2") String userid2,@RequestParam("groupid") long groupId){
		try {
			List<Transaction> transactions = transactionService.findByDebtorAndCreditorOrCreditorAndDebtorAndGroupId(userid1,userid2,groupId);
			Float balance = com.javasampleapproach.financev1.model.TransactionAggregate.balanceTransactions(transactions,userid1);
			return ResponseEntity.ok(balance);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	/**
	 * Calculate position of a user vs all the group of travelers
	 * retrieves the list of all operation of a user and balance them calling Wallet method
	 * @param userid self explaining
	 * @return position of the user vs all the group (total debt/credit) as a single transaction
	 */
	//@GetMapping(value = "transactions/positionVsAll/{userid}/{groupid}")
	@GetMapping(value = "transactions/positionVsAll")
	public ResponseEntity<?> calculateUserPositionVsAll(@RequestHeader("userId") String userid,@RequestParam("groupid") long groupId){
		try {
			List<Transaction> tl = transactionService.findByDebtorOrCreditorAndGroupId(userid,groupId);
			Float balance = com.javasampleapproach.financev1.model.TransactionAggregate.balanceTransactions(tl,userid);
			return ResponseEntity.ok(balance);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}

	}

	/**
	 * retrieves all transactions with username == creditor
	 * and matching with group id
	 * it means  alist with all the credits of a specif user in a specif group
	 * @param creditor -> self explaining
	 * @return a list of transaction where username == creditor
	 */
	//@GetMapping(value = "transactions/creditor/{creditor}/{groupid}")
	@GetMapping(value = "transactions/creditor")
	public ResponseEntity<?> findByCreditorAndGroupId(@RequestHeader("userId") String creditor,@RequestParam("groupid") long groupId){
		try {
			List<Transaction> transactions = transactionService.findByCreditorAndGroupId(creditor,groupId);
			return ResponseEntity.ok(transactions);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}


	//@GetMapping(value = "transactions/uuid/{uuid}")
	@GetMapping(value = "transactions/uuid")
	public ResponseEntity<?> findByUuid(@RequestParam("uuid") UUID uuid){
		try {
			List<Transaction> transactions = transactionService.findByUuid(uuid);
			return ResponseEntity.ok(transactions);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	/**
	 * method that returns an object with 1 creditor and all his debtor with relative amount
	 *	{
	 *  	"debtorAmountList": [{"debtor1":amount1},{"debtor2":amount2}],
	 *  	"creditorAmountList": [{"debtor1":amount1},{"debtor2":amount2}]
	 *	}
	 * serve un username , un group id
	 * 1)ritorno una lista con tutte le transazioni (per un  dato group id)dove username è creditore
	 * - da questa lista devo generare una lista che contiene per ogni utente del gruppo  il suo debito verso username
	 * 2)ritorno una lista con tutte le transazioni (per un dato group id) dove username è debitore
	 * - da questa lista devo generare una lista che contiene per ogni utente del gruppo  il suo credito verso username
	 */

	//@PostMapping("transactions/detailedPosition/{userid}/{groupId}")
	@GetMapping("transactions/detailedPosition")
	public ResponseEntity<?> getAllDebtorAndCreditorDetails(@RequestHeader("userId") String userid, @RequestParam("groupid") long groupId, @RequestParam("useridlist") List<String> userIdlist){
		try {
			DetailedPosition dp = new DetailedPosition();
			List<Transaction> debtsList = transactionService.findByDebtorAndGroupId(userid,groupId);
			dp.setCreditorAmountList(com.javasampleapproach.financev1.model.TransactionAggregate.generateCreditorAmountList(debtsList,userIdlist));
			List<Transaction> creditsList = transactionService.findByCreditorAndGroupId(userid,groupId);
			dp.setDebtorAmountList(com.javasampleapproach.financev1.model.TransactionAggregate.generateDebtorAmountList(creditsList,userIdlist));
			return ResponseEntity.ok(dp);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}


















}
