package com.cognizant.companyservice.dto;

import java.util.List;

public class StockExchangeDTO {
private Integer id;
	
	private String name;
	
	private String brief;
	
	private String remarks;
	private String contactAddress;
	private List<CompanyStockExchangeDTO> companyList;

	public StockExchangeDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StockExchangeDTO(Integer id, String name, String brief, String remarks, String contactAddress,
			List<CompanyStockExchangeDTO> companyList) {
		super();
		this.id = id;
		this.name = name;
		this.brief = brief;
		this.remarks = remarks;
		this.contactAddress = contactAddress;
		this.companyList = companyList;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public List<CompanyStockExchangeDTO> getCompanyList() {
		return companyList;
	}

	public void setCompanyList(List<CompanyStockExchangeDTO> companyList) {
		this.companyList = companyList;
	}

	public String getContactAddress() {
		return contactAddress;
	}

	public void setContactAddress(String contactAddress) {
		this.contactAddress = contactAddress;
	}

	@Override
	public String toString() {
		return "StockExchangeDTO [id=" + id + ", name=" + name + ", brief=" + brief + ", remarks=" + remarks
				+ ", contactAddress=" + contactAddress + ", companyList=" + companyList + "]";
	}
}
