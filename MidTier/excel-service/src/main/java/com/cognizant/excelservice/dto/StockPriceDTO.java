package com.cognizant.excelservice.dto;

import java.util.Date;

public class StockPriceDTO {
	private Integer id;

	private Double price;

	private Date date;

	private String companyCode;
	private Integer stockExchange;
	
	public StockPriceDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StockPriceDTO(Integer id, Double price, Date date, String companyCode, Integer stockExchange) {
		super();
		this.id = id;
		this.price = price;
		this.date = date;
		this.companyCode = companyCode;
		this.stockExchange = stockExchange;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public Integer getStockExchange() {
		return stockExchange;
	}

	public void setStockExchange(Integer stockExchange) {
		this.stockExchange = stockExchange;
	}

	@Override
	public String toString() {
		return "StockPriceDTO [id=" + id + ", price=" + price + ", date=" + date + ", companyCode=" + companyCode
				+ ", stockExchange=" + stockExchange + "]";
	}


}
