package com.cognizant.companyservice.dto;

public class CompanyStockExchangeDTO {
	private String code;
	
	private Integer company;
	private String companyName;
	private Integer stockExchange;
	private String stockExchangeName;
	public CompanyStockExchangeDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public CompanyStockExchangeDTO(String code, Integer company, String companyName, Integer stockExchange,
			String stockExchangeName) {
		super();
		this.code = code;
		this.company = company;
		this.companyName = companyName;
		this.stockExchange = stockExchange;
		this.stockExchangeName = stockExchangeName;
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

	
	public String getCompanyName() {
		return companyName;
	}


	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}


	public String getStockExchangeName() {
		return stockExchangeName;
	}


	public void setStockExchangeName(String stockExchangeName) {
		this.stockExchangeName = stockExchangeName;
	}


	@Override
	public String toString() {
		return "CompanyStockExchangeDTO [code=" + code + ", company=" + company + ", companyName=" + companyName
				+ ", stockExchange=" + stockExchange + ", stockExchangeName=" + stockExchangeName + "]";
	}



	
	
}
