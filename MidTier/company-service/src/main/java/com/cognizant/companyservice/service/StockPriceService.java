package com.cognizant.companyservice.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.companyservice.dto.SectorAggregate;
import com.cognizant.companyservice.entities.Company;
import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.CompanyStockExchangePK;
import com.cognizant.companyservice.entities.StockExchange;
import com.cognizant.companyservice.entities.StockPrice;
import com.cognizant.companyservice.exception.CompanyNotFoundException;
import com.cognizant.companyservice.exception.CompanyStockExchangeNotFound;
import com.cognizant.companyservice.exception.StockExchangeNotFoundException;
import com.cognizant.companyservice.exception.StockPriceNotFoundException;
import com.cognizant.companyservice.repository.StockPriceRepository;

@Service
public class StockPriceService {
	@Autowired
	private StockPriceRepository stockPriceRepository;
	@Autowired
	private CompanyService companyService;
	@Autowired
	private StockExchangeService stockExchangeService;
	@Autowired
	private CompanyStockExchangeService companyStockExchangeService;
	@Transactional
	public List<StockPrice> findAll() {
		return this.stockPriceRepository.findAll();
	}
	@Transactional
	public StockPrice findById(Integer id) throws StockPriceNotFoundException{
		Optional<StockPrice> stockPriceOptional = this.stockPriceRepository.findById(id);
		if(!stockPriceOptional.isPresent()) {
			throw new StockPriceNotFoundException();
		} else {
			return stockPriceOptional.get();
		}
	}
	@Transactional
	public List<StockPrice> findByCompanyStockExchange(Integer stockExchangeId, Integer companyId) throws CompanyNotFoundException, StockExchangeNotFoundException, CompanyStockExchangeNotFound {
		Company company = this.companyService.findCompanyById(companyId);
		StockExchange stockExchange = this.stockExchangeService.findById(stockExchangeId);
		CompanyStockExchange companyStockExchange = this.companyStockExchangeService.findById(new CompanyStockExchangePK(company, stockExchange));
		return this.stockPriceRepository.findByStockCode(companyStockExchange);
	}
	@Transactional
	public List<StockPrice> findByCompanyStockExchangeAndDateOn(Integer stockExchangeId, Integer companyId, Date date) throws CompanyNotFoundException, CompanyStockExchangeNotFound, StockExchangeNotFoundException {
		Company company = this.companyService.findCompanyById(companyId);
		StockExchange stockExchange = this.stockExchangeService.findById(stockExchangeId);
		CompanyStockExchange companyStockExchange = this.companyStockExchangeService.findById(new CompanyStockExchangePK(company, stockExchange));
		return this.stockPriceRepository.findByStockCodeAndDate(companyStockExchange, date);
	}
	@Transactional
	public List<StockPrice> findByCompanyStockExchangeAndDateBetween(Integer stockExchangeId, Integer companyId, Date from, Date to) throws CompanyNotFoundException, StockExchangeNotFoundException, CompanyStockExchangeNotFound {
		Company company = this.companyService.findCompanyById(companyId);
		StockExchange stockExchange = this.stockExchangeService.findById(stockExchangeId);
		CompanyStockExchange companyStockExchange = this.companyStockExchangeService.findById(new CompanyStockExchangePK(company, stockExchange));
		
		return this.stockPriceRepository.findByStockCodeAndDateBetween(companyStockExchange, from, to);
	}
	@Transactional
	public List<SectorAggregate> findAvgStockPriceBySectorAndStockExchangeDateBetween(Integer stockExchangeId, Integer sectorId, Date from, Date to) {
		return this.stockPriceRepository.findAvgStockPriceBySectorAndStockExchangeDateBetween(stockExchangeId, sectorId, from, to);
	}
	@Transactional
	public StockPrice addStockPrice(StockPrice stockPrice) {
		return this.stockPriceRepository.save(stockPrice);
	}
	@Transactional
	public StockPrice modifyStockPrice(StockPrice updatedStockPrice) {
		return this.stockPriceRepository.save(updatedStockPrice);
	}
	@Transactional
	public void deleteStockPrice(Integer id) {
		this.stockPriceRepository.deleteById(id);
	}
}
