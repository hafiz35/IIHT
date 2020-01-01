package com.cognizant.companyservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.CompanyStockExchangePK;
@Repository
public interface CompanyStockExchangeRepository extends JpaRepository<CompanyStockExchange, CompanyStockExchangePK> {
	@Query(value="SELECT cse FROM CompanyStockExchange cse where cse.code=:code and cse.companyStockExchange.stockExchange.id=:id")
	CompanyStockExchange findByCodeAndStockExchangeId(@Param("code") String code,@Param("id") Integer id); 
}
