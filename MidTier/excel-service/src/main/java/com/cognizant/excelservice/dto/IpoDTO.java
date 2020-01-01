package com.cognizant.excelservice.dto;

import java.util.Date;

public class IpoDTO {
	private Integer id;
	private String company;
	private String stockExchange;
	private Double price;
	private Integer totalShares;
	private Date openDate;
	private String remarks;
	public IpoDTO() {
		super();
		// TODO Auto-generated constructor stub
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
		return "IpoDTO [id=" + id + ", company=" + company + ", stockExchange=" + stockExchange + ", price=" + price
				+ ", totalShares=" + totalShares + ", openDate=" + openDate + ", remarks=" + remarks + "]";
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getStockExchange() {
		return stockExchange;
	}

	public void setStockExchange(String stockExchange) {
		this.stockExchange = stockExchange;
	}

	public IpoDTO(Integer id, String company, String stockExchange, Double price, Integer totalShares, Date openDate,
			String remarks) {
		super();
		this.id = id;
		this.company = company;
		this.stockExchange = stockExchange;
		this.price = price;
		this.totalShares = totalShares;
		this.openDate = openDate;
		this.remarks = remarks;
	}
	
	

}
