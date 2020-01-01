package com.cognizant.companyservice.dto;

import java.util.List;

public class CompanyDTO {
	private Integer id;
	private String name;
	private Double turnover;
	private String ceo;
	private String boardOfDirectors;
	private String brief;
	private Boolean active;
	private String sector;
	private Integer sectorId;
	private List<CompanyStockExchangeDTO> stockCodes;
	
	
	public CompanyDTO(Integer id, String name, Double turnover, String ceo, String boardOfDirectors, String brief,
			Boolean active, String sector, Integer sectorId, List<CompanyStockExchangeDTO> stockCodes) {
		super();
		this.id = id;
		this.name = name;
		this.turnover = turnover;
		this.ceo = ceo;
		this.boardOfDirectors = boardOfDirectors;
		this.brief = brief;
		this.active = active;
		this.sector = sector;
		this.sectorId = sectorId;
		this.stockCodes = stockCodes;
	}
	public CompanyDTO() {
		super();
		// TODO Auto-generated constructor stub
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
	public Double getTurnover() {
		return turnover;
	}
	public void setTurnover(Double turnover) {
		this.turnover = turnover;
	}
	public String getCeo() {
		return ceo;
	}
	public void setCeo(String ceo) {
		this.ceo = ceo;
	}
	public String getBoardOfDirectors() {
		return boardOfDirectors;
	}
	public void setBoardOfDirectors(String boardOfDirectors) {
		this.boardOfDirectors = boardOfDirectors;
	}
	public String getBrief() {
		return brief;
	}
	public void setBrief(String brief) {
		this.brief = brief;
	}
	
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public String getSector() {
		return sector;
	}
	public void setSector(String sector) {
		this.sector = sector;
	}
	public List<CompanyStockExchangeDTO> getStockCodes() {
		return stockCodes;
	}
	public void setStockCodes(List<CompanyStockExchangeDTO> stockCodes) {
		this.stockCodes = stockCodes;
	}
	public Integer getSectorId() {
		return sectorId;
	}
	public void setSectorId(Integer sectorId) {
		this.sectorId = sectorId;
	}
	@Override
	public String toString() {
		return "CompanyDTO [id=" + id + ", name=" + name + ", turnover=" + turnover + ", ceo=" + ceo
				+ ", boardOfDirectors=" + boardOfDirectors + ", brief=" + brief + ", active=" + active + ", sector="
				+ sector + ", sectorId=" + sectorId + ", stockCodes=" + stockCodes + "]";
	}


}
