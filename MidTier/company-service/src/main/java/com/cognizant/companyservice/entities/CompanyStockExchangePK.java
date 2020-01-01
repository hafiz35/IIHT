package com.cognizant.companyservice.entities;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Embeddable
public class CompanyStockExchangePK implements Serializable{
	@ManyToOne
	@JoinColumn(name="cs_co_id")
	@JsonIgnore
	private Company company;
	
	@ManyToOne
	@JoinColumn(name="cs_se_id")
	private StockExchange stockExchange;

	public CompanyStockExchangePK() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompanyStockExchangePK(Company company, StockExchange stockExchange) {
		super();
		this.company = company;
		this.stockExchange = stockExchange;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public StockExchange getStockExchange() {
		return stockExchange;
	}

	public void setStockExchange(StockExchange stockExchange) {
		this.stockExchange = stockExchange;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((company == null) ? 0 : company.hashCode());
		result = prime * result + ((stockExchange == null) ? 0 : stockExchange.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CompanyStockExchangePK other = (CompanyStockExchangePK) obj;
		if (company == null) {
			if (other.company != null)
				return false;
		} else if (!company.equals(other.company))
			return false;
		if (stockExchange == null) {
			if (other.stockExchange != null)
				return false;
		} else if (!stockExchange.equals(other.stockExchange))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "CompanyStockExchangePK [company=" + company + ", stockExchange=" + stockExchange + "]";
	}
	
}
