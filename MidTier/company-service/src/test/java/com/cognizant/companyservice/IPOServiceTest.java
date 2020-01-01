package com.cognizant.companyservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.repository.core.support.RepositoryFragment.ImplementedRepositoryFragment;
import org.springframework.test.context.junit4.SpringRunner;

import com.cognizant.companyservice.entities.IPO;
import com.cognizant.companyservice.entities.StockExchange;
import com.cognizant.companyservice.exception.IPONotFoundException;
import com.cognizant.companyservice.repository.CompanyRepository;
import com.cognizant.companyservice.repository.IPORepository;
import com.cognizant.companyservice.service.IPOService;
import com.netflix.discovery.converters.Auto;

@RunWith(SpringRunner.class)
@SpringBootTest
class IPOServiceTest {
	@Autowired
	private IPOService ipoService;
	
	@Autowired
	private CompanyRepository companyRepository;
	
	@MockBean
	private IPORepository ipoRepository;
	
	@Test
	public void testFindAll() {
		IPO ipoOne = new IPO(1,companyRepository.findById(1).get(),new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore"),100.00,100,new Date(),"Great");
		IPO ipoTwo= new IPO(2,companyRepository.findById(2).get(),new StockExchange(2,"NOKIA","Nokia","Great","Bangalore"),200.00,200,new Date(),"Great");
		
		List<IPO> ipoList = new ArrayList<IPO>();
		ipoList.add(ipoOne);
		ipoList.add(ipoTwo);
		
		Mockito.when(ipoRepository.findAll()).thenReturn(ipoList);
		assertThat(ipoService.findAllIPOs()).isEqualTo(ipoList);
	}
	
	@Test
	public void testFindById() throws IPONotFoundException {
		IPO ipo= new IPO(1,companyRepository.findById(1).get(),new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore"),100.00,100,new Date(),"Great");
		Mockito.when(ipoRepository.findById(1)).thenReturn(Optional.ofNullable(ipo));
		assertThat(ipoService.findById(1)).isEqualTo(ipo);
	}
	
	@Test
	public void testAddIpo() {
		IPO ipo= new IPO(1,companyRepository.findById(1).get(),new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore"),100.00,100,new Date(),"Great");
		Mockito.when(ipoRepository.save(ipo)).thenReturn(ipo);
		assertThat(ipoService.addIPO(ipo)).isEqualTo(ipo);
	
	}
	
	@Test
	public void testModifyIpo() {
		IPO ipo= new IPO(1,companyRepository.findById(1).get(),new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore"),100.00,100,new Date(),"Great");
		Mockito.when(ipoRepository.findById(1)).thenReturn(Optional.ofNullable(ipo));
		
		ipo.setRemarks("Good");
		
		Mockito.when(ipoRepository.save(ipo)).thenReturn(ipo);
		assertThat(ipoService.modifyIPO(ipo)).isEqualTo(ipo);
	}
	
	@Test
	public void testDeleteIpo(){
		IPO ipo= new IPO(1,companyRepository.findById(1).get(),new StockExchange(1,"SAMSUNG","Samsung","Great","Bangalore"),100.00,100,new Date(),"Great");
		Mockito.when(ipoRepository.findById(1)).thenReturn(Optional.ofNullable(ipo));
		Mockito.when(ipoRepository.existsById(ipo.getId())).thenReturn(false);
		assertFalse(ipoRepository.existsById(ipo.getId()));
	}
}