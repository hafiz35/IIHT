package com.cognizant.companyservice.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="ipo")
public class IPO {
	@Id
	@Column(name="ip_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="ip_co_id")
	private Company company;
	
	@ManyToOne
	@JoinColumn(name="ip_se_id")
	private StockExchange stockExchange;
	
	@Column(name="ip_price")
	private Double price;
	
	@Column(name="ip_total_shares")
	private Integer totalShares;
	
	@Column(name="ip_open_date_time")
	private Date openDate;
	
	@Column(name="ip_remarks")
	private String remarks;

	public IPO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public IPO(Integer id, Company company, StockExchange stockExchange, Double price, Integer totalShares,
			Date openDate, String remarks) {
		super();
		this.id = id;
		this.company = company;
		this.stockExchange = stockExchange;
		this.price = price;
		this.totalShares = totalShares;
		this.openDate = openDate;
		this.remarks = remarks;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getTotalShares() {
		return totalShares;
	}

	public void setTotalShares(Integer totalShares) {
		this.totalShares = totalShares;
	}

	public Date getOpenDate() {
		return openDate;
	}

	public void setOpenDate(Date openDate) {
		this.openDate = openDate;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "IPO [id=" + id + ", company=" + company + ", stockExchange=" + stockExchange + ", price=" + price
				+ ", totalShares=" + totalShares + ", openDate=" + openDate + ", remarks=" + remarks + "]";
	}
}
