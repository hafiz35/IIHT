package com.cognizant.companyservice.dto;

import java.util.Date;

public class SectorAggregate {
	private Date date;
	private Double price;
	public SectorAggregate() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SectorAggregate(Date date, Double price) {
		super();
		this.date = date;
		this.price = price;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "SectorAggregate [date=" + date + ", price=" + price + "]";
	}
	
}
