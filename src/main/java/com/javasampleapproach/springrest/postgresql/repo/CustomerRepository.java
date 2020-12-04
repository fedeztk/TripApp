package com.javasampleapproach.springrest.postgresql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.springrest.postgresql.model.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
	List<Customer> findByAge(int age);


}

