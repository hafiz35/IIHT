package com.cognizant.companyservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.cognizant.companyservice.entities.StockExchange;
import com.cognizant.companyservice.exception.StockExchangeNotFoundException;
import com.cognizant.companyservice.repository.StockExchangeRepository;
import com.cognizant.companyservice.service.StockExchangeService;
import com.netflix.discovery.converters.Auto;

@RunWith(SpringRunner.class)
@SpringBootTest
class StockExchangeServiceTest {

	@Autowired
	private StockExchangeService stockExchangeService;
	
	@MockBean
	private StockExchangeRepository stockExchangeRepository;
	
	@Test
	public void testFindAll() {
		StockExchange stockExchangeOne = new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore");
		StockExchange stockExchangeTwo = new StockExchange(1,"NOKIA","Nokia","Great","Bangalore");
		
		List<StockExchange> stockExchangeList = new ArrayList<StockExchange>();
		stockExchangeList.add(stockExchangeOne);
		stockExchangeList.add(stockExchangeTwo);
		
		Mockito.when(stockExchangeRepository.findAll()).thenReturn(stockExchangeList);
		assertThat(stockExchangeService.findAll()).isEqualTo(stockExchangeList);
	}
	
	@Test
	public void testFindById() throws StockExchangeNotFoundException {
		StockExchange stockExchange = new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore");
		Mockito.when(stockExchangeRepository.findById(1)).thenReturn(Optional.ofNullable(stockExchange));
		
		assertThat(stockExchangeService.findById(1)).isEqualTo(stockExchange);	}
	
	@Test
	public void testFindByName() throws StockExchangeNotFoundException {
		StockExchange stockExchange = new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore");
		Mockito.when(stockExchangeRepository.findByName("SAMSUNG")).thenReturn(Optional.ofNullable(stockExchange));
		
		assertThat(stockExchangeService.findByName("SAMSUNG")).isEqualTo(stockExchange);	
		}
		
	
	
	@Test
	public void testAddStockExchange() {
		StockExchange stockExchange = new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore");
		
		Mockito.when(stockExchangeRepository.save(stockExchange)).thenReturn(stockExchange);
		assertThat(stockExchangeService.addStockExchange(stockExchange)).isEqualTo(stockExchange);
	}
	
	@Test
	public void testModifyStockExchange() {
		StockExchange stockExchange = new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore");
		Mockito.when(stockExchangeRepository.findById(1)).thenReturn(Optional.ofNullable(stockExchange));
		
		stockExchange.setName("Updated SAMSUNG");
		Mockito.when(stockExchangeRepository.save(stockExchange)).thenReturn(stockExchange);
		assertThat(stockExchangeService.modifyStockExchange(stockExchange)).isEqualTo(stockExchange);
	}
	
	@Test
	public void testDeleteStockExchange() {
		StockExchange stockExchange = new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore");
		Mockito.when(stockExchangeRepository.findById(1)).thenReturn(Optional.ofNullable(stockExchange));
		Mockito.when(stockExchangeRepository.existsById(stockExchange.getId())).thenReturn(false);
		assertFalse(stockExchangeRepository.existsById(stockExchange.getId()));
	}
	
}