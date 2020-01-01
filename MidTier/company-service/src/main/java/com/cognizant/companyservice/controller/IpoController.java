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

import com.cognizant.companyservice.dto.IpoDTO;
import com.cognizant.companyservice.entities.IPO;
import com.cognizant.companyservice.exception.CompanyNotFoundException;
import com.cognizant.companyservice.exception.IPONotFoundException;
import com.cognizant.companyservice.exception.StockExchangeNotFoundException;
import com.cognizant.companyservice.service.CompanyService;
import com.cognizant.companyservice.service.IPOService;
import com.cognizant.companyservice.service.StockExchangeService;


@RestController
@RequestMapping("/ipo")
public class IpoController {
	@Autowired
	private IPOService ipoService;
	@Autowired
	private CompanyService companyService;
	@Autowired
	private StockExchangeService stockExchangeService;
	
	@GetMapping("/all")
	public List<IpoDTO> getAllIpos(){
		List<IpoDTO> ipos=this.ipoService.findAllIPOs().stream()
				.map(ipo->convertIPOtoIpoDTO(ipo))
				.collect(Collectors.toList());
		return ipos;
	}
	
	@GetMapping("/{id}")
	public IpoDTO getIpoById(@PathVariable("id") Integer id) throws IPONotFoundException {
		IPO ipo=this.ipoService.findById(id);
		IpoDTO ipoDTO=convertIPOtoIpoDTO(ipo);
		return ipoDTO;
	}
	
	@PostMapping
	public IpoDTO addIPO(@RequestBody IpoDTO ipoDTO) throws CompanyNotFoundException, StockExchangeNotFoundException {
		IPO ipo=convertIpoDTOtoIPO(ipoDTO);
		return convertIPOtoIpoDTO(ipoService.addIPO(ipo));
	}
	
	@PutMapping
	public IpoDTO modifyIPO(@RequestBody IpoDTO modifiedIpoDTO) throws CompanyNotFoundException, StockExchangeNotFoundException {
		IPO ipo=convertIpoDTOtoIPO(modifiedIpoDTO);
		return convertIPOtoIpoDTO(ipoService.modifyIPO(ipo));
	}
	
	@DeleteMapping("/{id}")
	public void deleteIPO(@PathVariable("id") Integer id) {
		this.ipoService.deleteIPO(id);
	}
	
	private IpoDTO convertIPOtoIpoDTO(IPO ipo) {
		IpoDTO ipoDTO=new IpoDTO();
		ipoDTO.setId(ipo.getId());
		ipoDTO.setRemarks(ipo.getRemarks());
		ipoDTO.setOpenDate(ipo.getOpenDate());
		ipoDTO.setPrice(ipo.getPrice());
		ipoDTO.setTotalShares(ipo.getTotalShares());
		ipoDTO.setCompany(ipo.getCompany().getName());
		ipoDTO.setStockExchange(ipo.getStockExchange().getName());;
		return ipoDTO;
	}
	private IPO convertIpoDTOtoIPO(IpoDTO ipoDTO) throws CompanyNotFoundException, StockExchangeNotFoundException {
		IPO ipo=new IPO();
		ipo.setId(ipoDTO.getId());
		ipo.setOpenDate(ipoDTO.getOpenDate());
		ipo.setPrice(ipoDTO.getPrice());
		ipo.setRemarks(ipoDTO.getRemarks());
		ipo.setTotalShares(ipoDTO.getTotalShares());
		ipo.setCompany(companyService.findCompanyByName(ipoDTO.getCompany()));
		ipo.setStockExchange(stockExchangeService.findByName(ipoDTO.getStockExchange()));
		return ipo;
	}

}
