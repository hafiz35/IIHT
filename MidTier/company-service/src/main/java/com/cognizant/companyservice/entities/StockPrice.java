package com.cognizant.companyservice.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="stock_price")
public class StockPrice {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="sp_id")
	private Integer id;
	
	@Column(name="sp_price")
	private Double price;
	
	@Column(name="sp_date")
	private Date date;
	
	@ManyToOne
	@JoinColumns(value= {
			@JoinColumn(name="sp_co_id"),
			@JoinColumn(name="sp_se_id")
	})
	private CompanyStockExchange stockCode;

	public StockPrice() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StockPrice(Integer id, Double price, Date date, CompanyStockExchange stockCode) {
		super();
		this.id = id;
		this.price = price;
		this.date = date;
		this.stockCode = stockCode;
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

	public CompanyStockExchange getStockCode() {
		return stockCode;
	}

	public void setStockCode(CompanyStockExchange stockCode) {
		this.stockCode = stockCode;
	}

	@Override
	public String toString() {
		return "StockPrice [id=" + id + ", price=" + price + ", date=" + date + ", stockCode=" + stockCode + "]";
	}
	
	
}
