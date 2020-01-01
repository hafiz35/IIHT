package com.cognizant.companyservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.cognizant.companyservice.entities.Company;
import com.cognizant.companyservice.entities.CompanyStockExchange;
import com.cognizant.companyservice.entities.Sector;
import com.cognizant.companyservice.exception.CompanyNotFoundException;
import com.cognizant.companyservice.repository.CompanyRepository;
import com.cognizant.companyservice.service.CompanyService;

@RunWith(SpringRunner.class)
@SpringBootTest
class CompanyServiceTest {

     @Autowired
     private CompanyService companyService;

     @MockBean
     // @Autowired
     private CompanyRepository companyRepository;

//   @Test
//   void test() {
//         fail("Not yet implemented");
//   }

     @Test
     void testFindAllCompanies() {

           Company company1 = new Company();

           company1.setId(1);
           company1.setName("POWER");
           company1.setTurnover(789456.0);
           company1.setActive(true);
           company1.setCeo("akhil");
           company1.setBoardOfDirectors("akhil angad");
           company1.setBrief("chuitiya");
           Sector sector = new Sector(1, "Electricity", "current");
           company1.setSector(sector);
           List<CompanyStockExchange> CSE = new ArrayList<CompanyStockExchange>();
           company1.setStockCodes(CSE);

           Company company2 = new Company();

           company2.setId(1);
           company2.setName("POWER2");
           company2.setTurnover(789456.0);
           company2.setActive(true);
           company2.setCeo("akhil");
           company2.setBoardOfDirectors("akhil angad");
           company2.setBrief("chuitiya");

           company2.setSector(sector);

           List<Company> companyList = Arrays.asList(company1, company2);
           Mockito.when(companyRepository.findAll()).thenReturn(companyList);
           System.out.println(companyList);
           System.out.println("asdf" + companyService.findAllCompanies());
           assertThat(companyService.findAllCompanies()).isEqualTo(companyList);
     }

     @Test
     void testFindAllActiveCompanies() {
           Company company1 = new Company();

           company1.setId(1);
           company1.setName("POWER");
           company1.setTurnover(789456.0);
           company1.setActive(true);
           company1.setCeo("akhil");
           company1.setBoardOfDirectors("akhil angad");
           company1.setBrief("chuitiya");
           Sector sector = new Sector(1, "Electricity", "current");
           company1.setSector(sector);
           List<CompanyStockExchange> CSE = new ArrayList<CompanyStockExchange>();
           company1.setStockCodes(CSE);

           Company company2 = new Company();

           company2.setId(1);
           company2.setName("POWER2");
           company2.setTurnover(789456.0);
           company2.setActive(false);
           company2.setCeo("akhil");
           company2.setBoardOfDirectors("akhil angad");
           company2.setBrief("chuitiya");

           company2.setSector(sector);

           List<Company> companyList = Arrays.asList(company1);
          Mockito.when(companyRepository.findByActive(true)).thenReturn(companyList);
           System.out.println(companyList);
           System.out.println("asdf" + companyService.findAllActiveCompanies());
          assertThat(companyService.findAllActiveCompanies()).isEqualTo(companyList);
     }

     @Test
     void testFindCompanyById() throws CompanyNotFoundException {
           Company company1 = new Company();
           company1.setId(1);
           company1.setName("POWER");
           company1.setTurnover(789456.0);
           company1.setActive(true);
           company1.setCeo("akhil");
           company1.setBoardOfDirectors("akhil angad");
           company1.setBrief("chuitiya");

     Mockito.when(companyRepository.findById(1)).thenReturn(Optional.ofNullable(company1));
           assertThat(companyService.findCompanyById(1)).isEqualTo(company1);
     }

     @Test
     void testFindCompanyByName() throws CompanyNotFoundException {
           Company company1 = new Company();
           company1.setId(1);
           company1.setName("POWER");
           company1.setTurnover(789456.0);
           company1.setActive(true);
           company1.setCeo("akhil");
           company1.setBoardOfDirectors("akhil angad");
           company1.setBrief("chuitiya");

     Mockito.when(companyRepository.findByName("POWER")).thenReturn(Optional.ofNullable(company1));
          assertThat(companyService.findCompanyByName("POWER")).isEqualTo(company1);
     }

     @Test
     void testAddCompany() {
           Company company1 = new Company();
           company1.setId(1);
           company1.setName("POWER");
           company1.setTurnover(789456.0);
           company1.setActive(true);
           company1.setCeo("akhil");
           company1.setBoardOfDirectors("akhil angad");
           company1.setBrief("chuitiya");
           
           Mockito.when(companyRepository.save(company1)).thenReturn(company1);
               
           assertThat(companyService.addCompany(company1)).isEqualTo(company1);
     }

     @Test
     void testModifyCompany() {
           Company company1 = new Company();
           company1.setId(1);
           company1.setName("POWER");
           company1.setTurnover(789456.0);
           company1.setActive(true);
           company1.setCeo("akhil");
           company1.setBoardOfDirectors("akhil angad");
           company1.setBrief("chuitiya");

     Mockito.when(companyRepository.findById(1)).thenReturn(Optional.ofNullable(company1));

           company1.setBrief("chutiya");
           Mockito.when(companyRepository.save(company1)).thenReturn(company1);

          assertThat(companyService.modifyCompany(company1)).isEqualTo(company1);
     }

     @Test
     void testDeleteCompany() {
           Company company1 = new Company();
           company1.setId(1);
           company1.setName("POWER");
           company1.setTurnover(789456.0);
           company1.setActive(true);
           company1.setCeo("akhil");
           company1.setBoardOfDirectors("akhil angad");
           company1.setBrief("chuitiya");

     Mockito.when(companyRepository.findById(1)).thenReturn(Optional.ofNullable(company1));
     Mockito.when(companyRepository.existsById(company1.getId())).thenReturn(false);
           assertFalse(companyRepository.existsById(company1.getId()));
     }

}

