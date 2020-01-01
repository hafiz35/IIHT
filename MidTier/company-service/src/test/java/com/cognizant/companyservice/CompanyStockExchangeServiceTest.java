package com.cognizant.companyservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertFalse;

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

import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.CompanyStockExchangePK;
import com.cognizant.companyservice.entities.StockExchange;
import com.cognizant.companyservice.exception.CompanyStockExchangeNotFound;
import com.cognizant.companyservice.repository.CompanyRepository;
import com.cognizant.companyservice.repository.CompanyStockExchangeRepository;
import com.cognizant.companyservice.service.CompanyStockExchangeService;

@RunWith(SpringRunner.class)
@SpringBootTest
class CompanyStockExchangeServiceTest {

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private CompanyStockExchangeService companyStockExchangeService;

	@MockBean
	private CompanyStockExchangeRepository companyStockExchangeRepository;

	@Test
	public void findAllTest() {
		StockExchange stockExchange = new StockExchange(1, "BSC", "Hello", "World", "Contact Address");

		CompanyStockExchangePK companyStockExchangePK = new CompanyStockExchangePK(companyRepository.findById(1).get(),
				stockExchange);
		CompanyStockExchange companyStockExchange = new CompanyStockExchange();
		companyStockExchange.setCode("1");
		companyStockExchange.setCompanyStockExchange(companyStockExchangePK);

		List<CompanyStockExchange> companyStockExchangeList = new ArrayList<CompanyStockExchange>();
		companyStockExchangeList.add(companyStockExchange);

		Mockito.when(companyStockExchangeRepository.findAll()).thenReturn(companyStockExchangeList);

		assertThat(companyStockExchangeService.findAll()).isEqualTo(companyStockExchangeList);
	}

	@Test
	public void findByIdTest() throws CompanyStockExchangeNotFound {
		StockExchange stockExchange = new StockExchange(1, "BSC", "Hello", "World", "Contact Address");

		CompanyStockExchangePK companyStockExchangePK = new CompanyStockExchangePK(companyRepository.findById(1).get(),
				stockExchange);
		CompanyStockExchange companyStockExchange = new CompanyStockExchange();
		companyStockExchange.setCode("1");
		companyStockExchange.setCompanyStockExchange(companyStockExchangePK);

		Mockito.when(companyStockExchangeRepository.findById(companyStockExchangePK))
				.thenReturn(Optional.ofNullable(companyStockExchange));
		assertThat(companyStockExchangeService.findById(companyStockExchangePK)).isEqualTo(companyStockExchange);
	}

	@Test
	public void addCompanyStockExchangeTest() {
		StockExchange stockExchange = new StockExchange(1, "BSC", "Hello", "World", "Contact Address");

		CompanyStockExchangePK companyStockExchangePK = new CompanyStockExchangePK(companyRepository.findById(1).get(),
				stockExchange);
		CompanyStockExchange companyStockExchange = new CompanyStockExchange();
		companyStockExchange.setCode("1");
		companyStockExchange.setCompanyStockExchange(companyStockExchangePK);

		Mockito.when(companyStockExchangeRepository.save(companyStockExchange)).thenReturn(companyStockExchange);
		assertThat(companyStockExchangeService.addCompanyStockExchange(companyStockExchange))
				.isEqualTo(companyStockExchange);
	}

	@Test
	public void modifyCompanyStockExchangeTest() {
		StockExchange stockExchange = new StockExchange(1, "BSC", "Hello", "World", "Contact Address");

		CompanyStockExchangePK companyStockExchangePK = new CompanyStockExchangePK(companyRepository.findById(1).get(),
				stockExchange);
		CompanyStockExchange companyStockExchange = new CompanyStockExchange();
		companyStockExchange.setCode("1");
		companyStockExchange.setCompanyStockExchange(companyStockExchangePK);

		Mockito.when(companyStockExchangeRepository.findById(companyStockExchangePK))
				.thenReturn(Optional.ofNullable(companyStockExchange));

		stockExchange = new StockExchange(1, "NSC", "Hello", "World", "Contact Address");
		companyStockExchangePK = new CompanyStockExchangePK(companyRepository.findById(1).get(), stockExchange);
		companyStockExchange.setCompanyStockExchange(companyStockExchangePK);
		Mockito.when(companyStockExchangeRepository.save(companyStockExchange)).thenReturn(companyStockExchange);

		assertThat(companyStockExchangeService.modifyCompanyStockExchange(companyStockExchange))
				.isEqualTo(companyStockExchange);
	}

	@Test
	public void deleteCompanyStockExchangeTest() {
		StockExchange stockExchange = new StockExchange(1, "BSC", "Hello", "World", "Contact Address");

		CompanyStockExchangePK companyStockExchangePK = new CompanyStockExchangePK(companyRepository.findById(1).get(),
				stockExchange);
		CompanyStockExchange companyStockExchange = new CompanyStockExchange();
		companyStockExchange.setCode("1");
		companyStockExchange.setCompanyStockExchange(companyStockExchangePK);

		Mockito.when(companyStockExchangeRepository.findById(companyStockExchangePK))
				.thenReturn(Optional.of(companyStockExchange));
		Mockito.when(companyStockExchangeRepository.existsById(companyStockExchangePK)).thenReturn(false);
		assertFalse(companyStockExchangeRepository.existsById(companyStockExchangePK));
	}

}