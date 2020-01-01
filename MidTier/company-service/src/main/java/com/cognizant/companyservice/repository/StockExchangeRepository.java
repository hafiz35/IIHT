package com.cognizant.companyservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.companyservice.entities.StockExchange;
@Repository
public interface StockExchangeRepository extends JpaRepository<StockExchange, Integer> {
	Optional<StockExchange> findByName(String name);
}
