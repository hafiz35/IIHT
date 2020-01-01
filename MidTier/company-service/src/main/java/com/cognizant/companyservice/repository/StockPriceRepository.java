package com.cognizant.companyservice.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cognizant.companyservice.dto.SectorAggregate;
import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.StockPrice;
@Repository
public interface StockPriceRepository extends JpaRepository<StockPrice, Integer> {
	List<StockPrice> findByStockCode(CompanyStockExchange stockCode);
	List<StockPrice> findByStockCodeAndDate(CompanyStockExchange stockCode, Date date);
	List<StockPrice> findByStockCodeAndDateBetween(CompanyStockExchange stockCode, Date from, Date to);
	@Query(value = "Select new com.cognizant.companyservice.dto.SectorAggregate(sp.date as date, AVG(sp.price) as price) from StockPrice sp where sp.stockCode.companyStockExchange.stockExchange.id=:stockExchange and sp.stockCode.companyStockExchange.company.sector.id = :sectorId and sp.date between :from and :to group by sp.date")
	List<SectorAggregate> findAvgStockPriceBySectorAndStockExchangeDateBetween(@Param("stockExchange")Integer stockExchangeId, @Param("sectorId")Integer id, @Param("from") Date from, @Param("to") Date to);
}
