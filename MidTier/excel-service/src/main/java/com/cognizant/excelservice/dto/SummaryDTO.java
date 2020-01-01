package com.cognizant.excelservice.dto;

import java.util.Date;
import java.util.List;

public class SummaryDTO {
	private String companyName;
	private String stockExchangeName;
	private Integer importedResource;
	private List<Integer> unsuccessfull;
	private Date fromDate;
	private Date toDate;
	public SummaryDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SummaryDTO(String companyName, String stockExchangeName, Integer importedResource,
			List<Integer> unsuccessfull, Date fromDate, Date toDate) {
		super();
		this.companyName = companyName;
		this.stockExchangeName = stockExchangeName;
		this.importedResource = importedResource;
		this.unsuccessfull = unsuccessfull;
		this.fromDate = fromDate;
		this.toDate = toDate;
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
	public Integer getImportedResource() {
		return importedResource;
	}
	public void setImportedResource(Integer importedResource) {
		this.importedResource = importedResource;
	}
	public List<Integer> getUnsuccessfull() {
		return unsuccessfull;
	}
	public void setUnsuccessfull(List<Integer> unsuccessfull) {
		this.unsuccessfull = unsuccessfull;
	}
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public Date getToDate() {
		return toDate;
	}
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	@Override
	public String toString() {
		return "SummaryDTO [companyName=" + companyName + ", stockExchangeName=" + stockExchangeName
				+ ", importedResource=" + importedResource + ", unsuccessfull=" + unsuccessfull + ", fromDate="
				+ fromDate + ", toDate=" + toDate + "]";
	}
	
	
}
