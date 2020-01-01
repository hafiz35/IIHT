package com.cognizant.excelservice.dto;

public class CompanyStockExchangeDTO {
	private String code;
	
	private Integer company;
	
	private Integer stockExchange;

	public CompanyStockExchangeDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompanyStockExchangeDTO(String code, Integer company, Integer stockExchange) {
		super();
		this.code = code;
		this.company = company;
		this.stockExchange = stockExchange;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getCompany() {
		return company;
	}

	public void setCompany(Integer company) {
		this.company = company;
	}

	public Integer getStockExchange() {
		return stockExchange;
	}

	public void setStockExchange(Integer stockExchange) {
		this.stockExchange = stockExchange;
	}

	
	@Override
	public String toString() {
		return "CompanyStockExchangeDTO [code=" + code + ", company=" + company + ", stockExchange=" + stockExchange
				+"]";
	}
	
	
}
