package com.cognizant.companyservice.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.companyservice.dto.CompanyDTO;
import com.cognizant.companyservice.dto.CompanyStockExchangeDTO;
import com.cognizant.companyservice.dto.StockExchangeDTO;
import com.cognizant.companyservice.entities.Company;
import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.StockExchange;
import com.cognizant.companyservice.exception.StockExchangeNotFoundException;
import com.cognizant.companyservice.service.StockExchangeService;

@RestController
@RequestMapping("/stock-exchange")
public class StockExchangeController {
	@Autowired
	private StockExchangeService stockExchangeService;

	@GetMapping("/all")
	public List<StockExchangeDTO> getAll() {
		List<StockExchangeDTO> stockExchangeDTOs = this.stockExchangeService.findAll().stream()
				.map(stockExchange -> convertStockExchangeToStockExchangeDTO(stockExchange))
				.collect(Collectors.toList());
		return stockExchangeDTOs;
	}

	@GetMapping("/{id}")
	public StockExchangeDTO findById(@PathVariable("id") Integer id) throws StockExchangeNotFoundException {
		return convertStockExchangeToStockExchangeDTO(this.stockExchangeService.findById(id));
	}
	@GetMapping("/name")
	public StockExchangeDTO findByName(@RequestParam("name") String name) throws StockExchangeNotFoundException {
		return convertStockExchangeToStockExchangeDTO(this.stockExchangeService.findByName(name));
	}
	@GetMapping("/{id}/companies")
	public List<CompanyDTO> getAllCompaniesInStockExchange(@PathVariable("id") Integer id) throws StockExchangeNotFoundException{
		StockExchange stockExchange = this.stockExchangeService.findById(id);
		List<Company> companies = stockExchange.getCompanyStocks().stream()
				.map(companyStock -> companyStock.getCompanyStockExchange().getCompany()).collect(Collectors.toList());
		List<CompanyDTO> companyDTOs = companies.stream().map(company -> convertCompanyToCompanyDTO(company)).collect(Collectors.toList());
		return companyDTOs;
	}
	@PostMapping
	public StockExchangeDTO addStockExchange(@RequestBody StockExchangeDTO stockExchangeDTO) {
		StockExchange stockExchange = convertStockExchangeDTOToStockExchange(stockExchangeDTO);
		return convertStockExchangeToStockExchangeDTO(this.stockExchangeService.addStockExchange(stockExchange));
	}

	@PutMapping
	public StockExchangeDTO modifyStockExchange(@RequestBody StockExchangeDTO updatedStockExchangeDTO) {
		StockExchange stockExchange = convertStockExchangeDTOToStockExchange(updatedStockExchangeDTO);
		return convertStockExchangeToStockExchangeDTO(this.stockExchangeService.modifyStockExchange(stockExchange));
	}

	@DeleteMapping("/{id}")
	public void deleteStockExchange(@PathVariable("id") Integer id) {
		this.stockExchangeService.deleteStockExchange(id);
	}

	private StockExchangeDTO convertStockExchangeToStockExchangeDTO(StockExchange stockExchange) {
		StockExchangeDTO stockExchangeDTO = new StockExchangeDTO();
		stockExchangeDTO.setId(stockExchange.getId());
		stockExchangeDTO.setBrief(stockExchange.getBrief());
		stockExchangeDTO.setName(stockExchange.getName());
		stockExchangeDTO.setRemarks(stockExchange.getRemarks());
		return stockExchangeDTO;
	}

	private StockExchange convertStockExchangeDTOToStockExchange(StockExchangeDTO stockExchangeDTO) {
		StockExchange stockExchange = new StockExchange();
		stockExchange.setName(stockExchangeDTO.getName());
		stockExchange.setBrief(stockExchangeDTO.getBrief());
		stockExchange.setContactAddress(stockExchangeDTO.getContactAddress());
		stockExchange.setRemarks(stockExchangeDTO.getRemarks());
		return stockExchange;
	}
	private CompanyStockExchangeDTO convertCompanyStockExchangeToCompanyStockExchangeDTO(
			CompanyStockExchange companyStockExchange) {
		CompanyStockExchangeDTO companyStockExchangeDTO = new CompanyStockExchangeDTO();
		companyStockExchangeDTO.setCode(companyStockExchange.getCode());
		companyStockExchangeDTO.setCompany(companyStockExchange.getCompanyStockExchange().getCompany().getId());
		companyStockExchangeDTO
				.setStockExchange(companyStockExchange.getCompanyStockExchange().getStockExchange().getId());
		return companyStockExchangeDTO;
	}
	private CompanyDTO convertCompanyToCompanyDTO(Company company) {
		CompanyDTO companyDTO = new CompanyDTO();
		companyDTO.setId(company.getId());
		companyDTO.setBoardOfDirectors(company.getBoardOfDirectors());
		companyDTO.setBrief(company.getBrief());
		companyDTO.setCeo(company.getCeo());
		companyDTO.setName(company.getName());
		companyDTO.setSector(company.getSector().getName());
		companyDTO.setTurnover(company.getTurnover());
		List<CompanyStockExchangeDTO> stockExchangeDTOs = company.getStockCodes().stream()
				.map(stockCode -> convertCompanyStockExchangeToCompanyStockExchangeDTO(stockCode))
				.collect(Collectors.toList());
		companyDTO.setStockCodes(stockExchangeDTOs);
		return companyDTO;
	}
}
