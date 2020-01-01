package com.cognizant.companyservice.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.companyservice.entities.StockExchange;
import com.cognizant.companyservice.exception.StockExchangeNotFoundException;
import com.cognizant.companyservice.repository.StockExchangeRepository;

@Service
public class StockExchangeService {
	@Autowired
	private StockExchangeRepository stockExchangeRepository;
	
	@Transactional
	public List<StockExchange> findAll() {
		return this.stockExchangeRepository.findAll();
	}
	@Transactional
	public StockExchange findById(Integer id) throws StockExchangeNotFoundException {
		Optional<StockExchange> stockOptional = this.stockExchangeRepository.findById(id);
		if(!stockOptional.isPresent()) {
			throw new StockExchangeNotFoundException();
		} else {
			return stockOptional.get();
		}
	}
	@Transactional
	public StockExchange findByName(String name) throws StockExchangeNotFoundException {
		Optional<StockExchange> stockOptional = this.stockExchangeRepository.findByName(name);
		if(!stockOptional.isPresent()) {
			throw new StockExchangeNotFoundException();
		} else {
			return stockOptional.get();
		}
	}
	@Transactional
	public StockExchange addStockExchange(StockExchange stockExchange) {
		return this.stockExchangeRepository.save(stockExchange);
	}
	@Transactional
	public StockExchange modifyStockExchange(StockExchange updatedStockExchange) {
		return this.stockExchangeRepository.save(updatedStockExchange);
	}
	@Transactional
	public void deleteStockExchange(Integer id) {
		this.stockExchangeRepository.deleteById(id);
	}
}
