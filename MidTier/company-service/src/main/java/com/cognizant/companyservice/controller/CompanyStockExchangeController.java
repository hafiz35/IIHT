package com.cognizant.companyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.companyservice.service.CompanyStockExchangeService;

@RestController
@RequestMapping("/company-stock-exchange")
public class CompanyStockExchangeController {
	@Autowired
	private CompanyStockExchangeService companyStockExchangeService;
	
	@GetMapping("/verify/{stockExchangeId}/{code}")
	private boolean companyCodeExists(@PathVariable("stockExchangeId")Integer stockExchangeId, @PathVariable("code") String code) {
		return companyStockExchangeService.companyCodeExists(stockExchangeId, code);
	}
}
