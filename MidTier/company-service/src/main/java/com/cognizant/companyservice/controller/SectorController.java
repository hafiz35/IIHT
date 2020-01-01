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
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.companyservice.dto.CompanyDTO;
import com.cognizant.companyservice.dto.CompanyStockExchangeDTO;
import com.cognizant.companyservice.dto.SectorDTO;
import com.cognizant.companyservice.entities.Company;
import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.Sector;
import com.cognizant.companyservice.exception.SectorNotFoundException;
import com.cognizant.companyservice.service.SectorService;

@RestController
@RequestMapping("/sector")
public class SectorController {
	@Autowired
	private SectorService sectorService;

	@GetMapping("/all")
	public List<SectorDTO> getAllSectors() {
		List<SectorDTO> sectors = this.sectorService.findAllSectors().stream()
				.map(sector -> convertSectorToSectorDTO(sector, false)).collect(Collectors.toList());
		return sectors;
	}

	@GetMapping("/{id}")
	public SectorDTO getSectorById(@PathVariable("id") Integer id) throws SectorNotFoundException {
		Sector sector = this.sectorService.findById(id);
		SectorDTO sectorDTO = convertSectorToSectorDTO(sector, false);
		return sectorDTO;
	}

	@GetMapping("/{id}/companies")
	public List<CompanyDTO> getSectorCompanies(@PathVariable("id") Integer id) throws SectorNotFoundException {
		Sector sector = this.sectorService.findById(id);
		List<CompanyDTO> companies = sector.getCompanies().stream().map(company -> convertCompanyToCompanyDTO(company))
				.collect(Collectors.toList());
		return companies;
	}

	@PostMapping
	public SectorDTO addSector(@RequestBody SectorDTO sectorDTO) {
		Sector sector = convertSectorDTOToSector(sectorDTO);
		return convertSectorToSectorDTO(sectorService.addSector(sector), false);
	}

	@PutMapping
	public SectorDTO modifySector(@RequestBody SectorDTO updatedSectorDTO) {
		Sector sector = convertSectorDTOToSector(updatedSectorDTO);
		return convertSectorToSectorDTO(sectorService.modifySector(sector), false);
	}
	@DeleteMapping("/{id}")
	public void deleteSector(@PathVariable("id")Integer id) {
		this.sectorService.deleteSector(id);
	}
	private SectorDTO convertSectorToSectorDTO(Sector sector, boolean includeList) {
		SectorDTO sectorDTO = new SectorDTO();
		sectorDTO.setId(sector.getId());
		sectorDTO.setBrief(sector.getBrief());
		sectorDTO.setName(sector.getName());
		if (includeList) {
			List<CompanyDTO> companies = sector.getCompanies().stream()
					.map(company -> convertCompanyToCompanyDTO(company)).collect(Collectors.toList());
			sectorDTO.setCompanies(companies);
		}
		return sectorDTO;
	}

	private Sector convertSectorDTOToSector(SectorDTO sectorDTO) {
		Sector sector = new Sector();
		sector.setId(sectorDTO.getId());
		sector.setBrief(sectorDTO.getBrief());
		sector.setName(sectorDTO.getName());
		return sector;
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
