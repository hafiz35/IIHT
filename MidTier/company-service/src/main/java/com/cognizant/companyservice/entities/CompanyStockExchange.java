package com.cognizant.companyservice.entities;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="company_stock_exchange")
public class CompanyStockExchange {
	@EmbeddedId
	private CompanyStockExchangePK companyStockExchange;

	@Column(name="cs_code")
	private String code;
	
	public CompanyStockExchange() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompanyStockExchange(CompanyStockExchangePK companyStockExchange, String code) {
		super();
		this.companyStockExchange = companyStockExchange;
		this.code = code;
	}

	public CompanyStockExchangePK getCompanyStockExchange() {
		return companyStockExchange;
	}

	public void setCompanyStockExchange(CompanyStockExchangePK companyStockExchange) {
		this.companyStockExchange = companyStockExchange;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}


	@Override
	public String toString() {
		return "CompanyStockExchange [companyStockExchange=" + companyStockExchange + ", code=" + code + "]";
	}

	
}
