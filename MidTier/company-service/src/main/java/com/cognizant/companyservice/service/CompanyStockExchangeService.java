package com.cognizant.companyservice.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.CompanyStockExchangePK;
import com.cognizant.companyservice.exception.CompanyStockExchangeNotFound;
import com.cognizant.companyservice.repository.CompanyStockExchangeRepository;

@Service
public class CompanyStockExchangeService {
	@Autowired
	private CompanyStockExchangeRepository companyStockExchangeRepository;
	
	@Transactional
	public List<CompanyStockExchange> findAll() {
		return this.companyStockExchangeRepository.findAll();
	}
	@Transactional
	public CompanyStockExchange findById(CompanyStockExchangePK companyStockExchangePK) throws CompanyStockExchangeNotFound {
		Optional<CompanyStockExchange> companyStockExchangeOptional = this.companyStockExchangeRepository.findById(companyStockExchangePK);
		if(!companyStockExchangeOptional.isPresent()) {
			throw new CompanyStockExchangeNotFound();
		} else {
			return companyStockExchangeOptional.get();
		}
	}
	@Transactional
	public CompanyStockExchange findByCodeAndStockExchangeId(String code, Integer stockExchangeId) {
		return this.companyStockExchangeRepository.findByCodeAndStockExchangeId(code, stockExchangeId);
	}
	@Transactional
	public CompanyStockExchange addCompanyStockExchange(CompanyStockExchange companyStockExchange) {
		return this.companyStockExchangeRepository.save(companyStockExchange);
	}
	@Transactional
	public CompanyStockExchange modifyCompanyStockExchange(CompanyStockExchange updatedCompanyStockExchange) {
		return this.companyStockExchangeRepository.save(updatedCompanyStockExchange);
	}
	@Transactional
	public void deleteCompanyStockExchange(CompanyStockExchangePK companExchangePK) {
		this.companyStockExchangeRepository.deleteById(companExchangePK);
	}
	@Transactional
	public boolean companyCodeExists(Integer stockExchangeId, String code) {
		return this.companyStockExchangeRepository.findByCodeAndStockExchangeId(code, stockExchangeId) != null;
	}
}
