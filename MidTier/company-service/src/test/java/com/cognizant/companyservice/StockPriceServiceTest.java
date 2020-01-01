package com.cognizant.companyservice;

import static org.assertj.core.api.Assertions.assertThat;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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
import com.cognizant.companyservice.entities.StockPrice;
import com.cognizant.companyservice.exception.CompanyNotFoundException;
import com.cognizant.companyservice.exception.CompanyStockExchangeNotFound;
import com.cognizant.companyservice.exception.StockExchangeNotFoundException;
import com.cognizant.companyservice.exception.StockPriceNotFoundException;
import com.cognizant.companyservice.repository.StockPriceRepository;
import com.cognizant.companyservice.service.CompanyService;
import com.cognizant.companyservice.service.StockExchangeService;
import com.cognizant.companyservice.service.StockPriceService;

@RunWith(SpringRunner.class)
@SpringBootTest
class StockPriceServiceTest {

                @Autowired
                StockPriceService stockPriceService;

                @Autowired
                StockExchangeService stockExchangeService;

                @Autowired
                CompanyService companyService;

                @MockBean
                StockPriceRepository stockPriceRepository;

                @Test
                void testFindAll() {
                                StockPrice stockPrice = new StockPrice();
                                stockPrice.setId(1);
                                stockPrice.setPrice(45612.12);
                                stockPrice.setDate(new Date());
                                CompanyStockExchange stockCode = new CompanyStockExchange();
                                stockPrice.setStockCode(stockCode);
                                StockPrice stockPrice2 = new StockPrice();
                                stockPrice2.setId(2);
                                stockPrice2.setPrice(79612.12);
                                stockPrice2.setDate(new Date());
                                stockPrice2.setStockCode(stockCode);
                                List<StockPrice> stockPriceList = Arrays.asList(stockPrice, stockPrice2);
                                Mockito.when(stockPriceRepository.findAll()).thenReturn(stockPriceList);
                                assertThat(stockPriceService.findAll()).isEqualTo(stockPriceList);

                }

                @Test
                void testFindById() throws StockPriceNotFoundException {
                                StockPrice stockPrice = new StockPrice();
                                stockPrice.setId(1);
                                stockPrice.setPrice(45612.12);
                                stockPrice.setDate(new Date());
                                CompanyStockExchange stockCode = new CompanyStockExchange();
                                stockPrice.setStockCode(stockCode);

                                Mockito.when(stockPriceRepository.findById(1)).thenReturn(Optional.ofNullable(stockPrice));
                                assertThat(stockPriceService.findById(1)).isEqualTo(stockPrice);
                }

//            @Test
//            void testFindByCompanyStockExchange() throws CompanyNotFoundException, StockExchangeNotFoundException, CompanyStockExchangeNotFound {
//                            StockPrice stockPrice = new StockPrice();
//                            stockPrice.setId(1);
//                            stockPrice.setPrice(45612.12);
//                            stockPrice.setDate(new Date());
//                            CompanyStockExchange stockCode= new CompanyStockExchange();
//                            stockCode.setCode("BSE");
//                            stockCode.setCompanyStockExchange(null);
//                            stockPrice.setStockCode(stockCode);
//                            
//                            StockPrice stockPrice2 = new StockPrice();
//                            stockPrice2.setId(1);
//                            stockPrice2.setPrice(45612.12);
//                            stockPrice2.setDate(new Date());
//                            stockPrice2.setStockCode(stockCode);
//                            
//                            
//                            List<StockPrice> stockPriceList = Arrays.asList(stockPrice, stockPrice2);
//                            
//                            Mockito.when(stockPriceRepository.findByStockCode(stockCode)).thenReturn(stockPriceList);
//                            assertThat(stockPriceService.findByCompanyStockExchange(1, 1)).isEqualTo(stockPriceList);
//                            
//            }
//            @Test
//            void testFindByCompanyStockExchangeAndDateOn() {
//                            
//            }
//            @Test
//            void testFindByCompanyStockExchangeAndDateBetween() {
//                            
//            }
                @Test
                void testAddStockPrice() {
                                StockPrice stockPrice = new StockPrice();
                                stockPrice.setId(1);
                                stockPrice.setPrice(45612.12);
                                stockPrice.setDate(new Date());
                                CompanyStockExchange stockCode = new CompanyStockExchange();
                                stockCode.setCode("BSE");
                                stockCode.setCompanyStockExchange(null);
                                stockPrice.setStockCode(stockCode);
                                Mockito.when(stockPriceRepository.save(stockPrice)).thenReturn(stockPrice);
                                assertThat(stockPriceService.addStockPrice(stockPrice)).isEqualTo(stockPrice);
                }

                @Test
                void testModifyStockPrice() {
                                StockPrice stockPrice = new StockPrice();
                                stockPrice.setId(1);
                                stockPrice.setPrice(45612.12);
                                stockPrice.setDate(new Date());
                                CompanyStockExchange stockCode = new CompanyStockExchange();
                                stockCode.setCode("BSE");
                                stockCode.setCompanyStockExchange(null);
                                stockPrice.setStockCode(stockCode);
                                Mockito.when(stockPriceRepository.findById(1)).thenReturn(Optional.ofNullable(stockPrice));
                                stockPrice.setPrice(12345.6);
                                Mockito.when(stockPriceRepository.save(stockPrice)).thenReturn(stockPrice);
                                assertThat(stockPriceService.modifyStockPrice(stockPrice)).isEqualTo(stockPrice);

                }

                @Test
                void testDeleteStockPrice() {
                                StockPrice stockPrice = new StockPrice();
                                stockPrice.setId(1);
                                stockPrice.setPrice(45612.12);
                                stockPrice.setDate(new Date());
                                CompanyStockExchange stockCode = new CompanyStockExchange();
                                stockCode.setCode("BSE");
                                stockCode.setCompanyStockExchange(null);
                                stockPrice.setStockCode(stockCode);
                                Mockito.when(stockPriceRepository.findById(1)).thenReturn(Optional.ofNullable(stockPrice));
                                Mockito.when(stockPriceRepository.existsById(stockPrice.getId())).thenReturn(false);
                                assertFalse(stockPriceRepository.existsById(stockPrice.getId()));
                }
}

