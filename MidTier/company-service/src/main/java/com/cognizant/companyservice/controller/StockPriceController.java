package com.cognizant.companyservice.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.companyservice.dto.SectorAggregate;
import com.cognizant.companyservice.dto.StockPriceDTO;
import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.Sector;
import com.cognizant.companyservice.entities.StockPrice;
import com.cognizant.companyservice.exception.CompanyNotFoundException;
import com.cognizant.companyservice.exception.CompanyStockExchangeNotFound;
import com.cognizant.companyservice.exception.SectorNotFoundException;
import com.cognizant.companyservice.exception.StockExchangeNotFoundException;
import com.cognizant.companyservice.service.CompanyStockExchangeService;
import com.cognizant.companyservice.service.SectorService;
import com.cognizant.companyservice.service.StockPriceService;

@RestController
@RequestMapping("/stock-price")
public class StockPriceController {
	@Autowired
	private StockPriceService stockPriceService;
	@Autowired
	private CompanyStockExchangeService companyStockExchangeService;
	@Autowired
	private SectorService sectorService;

	@GetMapping("/{stockExchange}/{company}")
	public List<StockPriceDTO> findAllByCompanyStockExchange(@PathVariable("stockExchange") Integer stockExchange,
			@PathVariable("company") Integer company, @RequestParam("from") @DateTimeFormat(iso = ISO.DATE) Date from,
			@RequestParam("to") @DateTimeFormat(iso = ISO.DATE) Date to)
			throws CompanyNotFoundException, StockExchangeNotFoundException, CompanyStockExchangeNotFound {
		List<StockPrice> stockPrices;
		if (from == null && to == null) {
			stockPrices = this.stockPriceService.findByCompanyStockExchange(stockExchange, company);
		} else if (to == null) {
			stockPrices = this.stockPriceService.findByCompanyStockExchangeAndDateBetween(stockExchange, company, from,
					new Date());
		} else {
			stockPrices = this.stockPriceService.findByCompanyStockExchangeAndDateBetween(stockExchange, company, from,
					to);
			System.out.println(from + " " + to);

		}
		List<StockPriceDTO> stockPriceDTOs = stockPrices.stream()
				.map(stockPrice -> convertStockPriceToStockPriceDTO(stockPrice)).collect(Collectors.toList());
		return stockPriceDTOs;

	}

	@GetMapping
	public List<ArrayList<Object>> findAllByCompanyStockExchangeList(@RequestParam("companyList") Integer[] company,
			@RequestParam("stockExchangeList") Integer[] stockExchange,
			@RequestParam("from") @DateTimeFormat(iso = ISO.DATE) Date from,
			@RequestParam("to") @DateTimeFormat(iso = ISO.DATE) Date to)
			throws CompanyNotFoundException, StockExchangeNotFoundException, CompanyStockExchangeNotFound {
		int i = 0;
		List<ArrayList<Object>> stockData = new ArrayList<ArrayList<Object>>();
		for (i = 0; i < company.length; i++) {
			List<StockPrice> stockPrices;
			if (from == null && to == null) {
				stockPrices = this.stockPriceService.findByCompanyStockExchange(stockExchange[i], company[i]);
			} else if (to == null) {
				stockPrices = this.stockPriceService.findByCompanyStockExchangeAndDateBetween(stockExchange[i],
						company[i], from, new Date());
			} else {
				stockPrices = this.stockPriceService.findByCompanyStockExchangeAndDateBetween(stockExchange[i],
						company[i], from, to);
			}
			SimpleDateFormat format = new SimpleDateFormat("dd-MMM-yy");
			for(StockPrice stockPrice: stockPrices) {
				ArrayList<Object> companyStockPrice = new ArrayList<>();
				companyStockPrice.add(stockExchange[i]+stockPrice.getStockCode().getCode());
				companyStockPrice.add(format.format(stockPrice.getDate()));
				companyStockPrice.add(stockPrice.getPrice());
				stockData.add(companyStockPrice);
			}
		}
		return stockData;
	}

	@GetMapping("/sector")
	public List<ArrayList<Object>> getStockPriceBySectorAndDateBetween(
			@RequestParam("stockExchangeList") Integer[] stockExchanges, @RequestParam("sectorList") Integer[] sectors,
			@RequestParam("from") @DateTimeFormat(iso = ISO.DATE) Date from,
			@RequestParam("to") @DateTimeFormat(iso = ISO.DATE) Date to) throws SectorNotFoundException {
		int i = 0;
		List<ArrayList<Object>> stockData = new ArrayList<ArrayList<Object>>();
		for (i = 0; i < sectors.length; i++) {

			List<SectorAggregate> stockPrice = this.stockPriceService
					.findAvgStockPriceBySectorAndStockExchangeDateBetween(stockExchanges[i], sectors[i], from, to);
			SimpleDateFormat format = new SimpleDateFormat("dd-MMM-yy");

			for (SectorAggregate price : stockPrice) {
				ArrayList<Object> companyStockPrice = new ArrayList<>();
				Sector sector;
				try {
					sector = sectorService.findById(sectors[i]);
					companyStockPrice.add(stockExchanges[i]+sector.getName());
				} catch (SectorNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				companyStockPrice.add(format.format(price.getDate()));
				companyStockPrice.add(price.getPrice());
				stockData.add(companyStockPrice);
			}
		}
		return stockData;
	}

	@PostMapping
	public StockPriceDTO addStockPrice(@RequestBody StockPriceDTO stockPriceDTO) {
		StockPrice stockPrice = this.stockPriceService.addStockPrice(convertStockPriceDTOToStockPrice(stockPriceDTO));
		return convertStockPriceToStockPriceDTO(stockPrice);

	}

	private StockPriceDTO convertStockPriceToStockPriceDTO(StockPrice stockPrice) {
		StockPriceDTO stockPriceDTO = new StockPriceDTO();
		stockPriceDTO.setCompanyCode(stockPrice.getStockCode().getCode());
		stockPriceDTO.setDate(stockPrice.getDate());
		stockPriceDTO.setId(stockPrice.getId());
		stockPriceDTO.setPrice(stockPrice.getPrice());
		stockPriceDTO.setStockExchange(stockPrice.getStockCode().getCompanyStockExchange().getStockExchange().getId());
		return stockPriceDTO;
	}

	private StockPrice convertStockPriceDTOToStockPrice(StockPriceDTO stockPriceDTO) {
		StockPrice stockPrice = new StockPrice();
		CompanyStockExchange companyStockExchange = this.companyStockExchangeService
				.findByCodeAndStockExchangeId(stockPriceDTO.getCompanyCode(), stockPriceDTO.getStockExchange());
		stockPrice.setStockCode(companyStockExchange);
		stockPrice.setDate(stockPriceDTO.getDate());
		stockPrice.setPrice(stockPriceDTO.getPrice());
		return stockPrice;
	}
}
