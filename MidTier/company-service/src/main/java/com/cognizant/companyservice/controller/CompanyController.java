package com.cognizant.companyservice.controller;

import java.net.URLDecoder;
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
import com.cognizant.companyservice.entities.Company;
import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.CompanyStockExchangePK;
import com.cognizant.companyservice.entities.Sector;
import com.cognizant.companyservice.entities.StockExchange;
import com.cognizant.companyservice.exception.CompanyNotFoundException;
import com.cognizant.companyservice.exception.SectorNotFoundException;
import com.cognizant.companyservice.exception.StockExchangeNotFoundException;
import com.cognizant.companyservice.service.CompanyService;
import com.cognizant.companyservice.service.CompanyStockExchangeService;
import com.cognizant.companyservice.service.SectorService;
import com.cognizant.companyservice.service.StockExchangeService;

@RestController
@RequestMapping("/company")
public class CompanyController {
	@Autowired
	private CompanyService companyService;
	@Autowired
	private StockExchangeService stockExchangeService;
	@Autowired
	private SectorService sectorService;
	@Autowired
	private CompanyStockExchangeService companyStockExchangeService;

	@GetMapping("/all")
	public List<CompanyDTO> findAll() {
		List<Company> companies = companyService.findAllCompanies();
		List<CompanyDTO> companyDTOs = companies.stream().map(company -> convertCompanyToCompanyDTO(company))
				.collect(Collectors.toList());
		return companyDTOs;
	}

	@GetMapping
	public List<CompanyDTO> findActiveCompanies() {
		List<Company> companies = companyService.findAllActiveCompanies();
		List<CompanyDTO> companyDTOs = companies.stream().map(company -> convertCompanyToCompanyDTO(company))
				.collect(Collectors.toList());
		return companyDTOs;
	}

	@GetMapping("/{id}")
	public CompanyDTO findById(@PathVariable("id") Integer id) throws CompanyNotFoundException {
		Company company = companyService.findCompanyById(id);
		return convertCompanyToCompanyDTO(company);
	}

	@PostMapping
	public CompanyDTO addCompany(@RequestBody CompanyDTO companyDTO)
			throws SectorNotFoundException, CompanyNotFoundException {
		Company company = companyService.addCompany(convertCompanyDTOToCompany(companyDTO));
		List<CompanyStockExchange> stockCodes = companyDTO.getStockCodes().stream().map(stockCode -> {
			stockCode.setCompany(company.getId());
			return stockCode;
		}).map(stockCode -> {
			try {
				return convertCompanyStockExchangeDTOToCompanyStockExchange(stockCode);
			} catch (CompanyNotFoundException | StockExchangeNotFoundException e) {
				e.printStackTrace();
			}
			return null;
		}).collect(Collectors.toList());
		stockCodes.stream().forEach(stockCode -> companyStockExchangeService.addCompanyStockExchange(stockCode));
		company.setStockCodes(stockCodes);
		return convertCompanyToCompanyDTO(company);
	}

	@PutMapping
	public CompanyDTO modifyCompany(@RequestBody CompanyDTO companyDTO) throws SectorNotFoundException {
		Company company = companyService.modifyCompany(convertCompanyDTOToCompany(companyDTO));
		return convertCompanyToCompanyDTO(company);

	}

	@PutMapping("/{id}/toggle-active")
	public CompanyDTO toggleActive(@PathVariable("id") Integer id) throws CompanyNotFoundException {
		Company company = companyService.findCompanyById(id);
		company.setActive(!company.getActive());
		companyService.modifyCompany(company);
		return convertCompanyToCompanyDTO(company);
	}

	@DeleteMapping("/{id}")
	public void deleteCompany(@PathVariable("id") Integer id) {
		this.companyService.deleteCompany(id);
	}

	@SuppressWarnings("deprecation")
	@GetMapping("/verify")
	public boolean companyExists(@RequestParam("name") String name) {
		try {
			this.companyService.findCompanyByName(URLDecoder.decode(name));
			return true;
		} catch (CompanyNotFoundException e) {
			return false;
		}
	}

	private CompanyStockExchangeDTO convertCompanyStockExchangeToCompanyStockExchangeDTO(
			CompanyStockExchange companyStockExchange) {
		CompanyStockExchangeDTO companyStockExchangeDTO = new CompanyStockExchangeDTO();
		companyStockExchangeDTO.setCode(companyStockExchange.getCode());
		companyStockExchangeDTO.setCompany(companyStockExchange.getCompanyStockExchange().getCompany().getId());
		companyStockExchangeDTO.setCompanyName(companyStockExchange.getCompanyStockExchange().getCompany().getName());
		companyStockExchangeDTO
				.setStockExchange(companyStockExchange.getCompanyStockExchange().getStockExchange().getId());
		companyStockExchangeDTO
				.setStockExchangeName(companyStockExchange.getCompanyStockExchange().getStockExchange().getName());
		return companyStockExchangeDTO;
	}

	private CompanyStockExchange convertCompanyStockExchangeDTOToCompanyStockExchange(
			CompanyStockExchangeDTO companyStockExchangeDTO)
			throws CompanyNotFoundException, StockExchangeNotFoundException {
		CompanyStockExchange companyStockExchange = new CompanyStockExchange();
		companyStockExchange.setCode(companyStockExchangeDTO.getCode());
		Company company = companyService.findCompanyById(companyStockExchangeDTO.getCompany());
		StockExchange stockExchange = stockExchangeService.findById(companyStockExchangeDTO.getStockExchange());
		companyStockExchange.setCompanyStockExchange(new CompanyStockExchangePK(company, stockExchange));
		return companyStockExchange;
	}

	private CompanyDTO convertCompanyToCompanyDTO(Company company) {
		CompanyDTO companyDTO = new CompanyDTO();
		companyDTO.setId(company.getId());
		companyDTO.setBoardOfDirectors(company.getBoardOfDirectors());
		companyDTO.setBrief(company.getBrief());
		companyDTO.setCeo(company.getCeo());
		companyDTO.setName(company.getName());
		companyDTO.setActive(company.getActive());
		companyDTO.setSectorId(company.getSector().getId());
		companyDTO.setSector(company.getSector().getName());
		companyDTO.setTurnover(company.getTurnover());
		List<CompanyStockExchangeDTO> stockExchangeDTOs = company.getStockCodes().stream()
				.map(stockCode -> convertCompanyStockExchangeToCompanyStockExchangeDTO(stockCode))
				.collect(Collectors.toList());
		companyDTO.setStockCodes(stockExchangeDTOs);
		return companyDTO;
	}

	private Company convertCompanyDTOToCompany(CompanyDTO companyDTO) throws SectorNotFoundException {
		Sector sector = sectorService.findById(companyDTO.getSectorId());
		Company company = new Company(companyDTO.getId(), companyDTO.getName(), companyDTO.getTurnover(),
				companyDTO.getCeo(), companyDTO.getBoardOfDirectors(), companyDTO.getBrief(), companyDTO.getActive(),
				sector);
		return company;
	}
}
