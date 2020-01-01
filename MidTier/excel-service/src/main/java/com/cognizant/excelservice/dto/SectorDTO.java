package com.cognizant.excelservice.dto;

import java.util.List;

public class SectorDTO {
	private Integer id;
	private String name;
	private String brief;
	private List<CompanyDTO> companies;
	public SectorDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SectorDTO(Integer id, String name, String brief, List<CompanyDTO> companies) {
		super();
		this.id = id;
		this.name = name;
		this.brief = brief;
		this.companies = companies;
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
	public List<CompanyDTO> getCompanies() {
		return companies;
	}
	public void setCompanies(List<CompanyDTO> companies) {
		this.companies = companies;
	}
	@Override
	public String toString() {
		return "SectorDTO [id=" + id + ", name=" + name + ", brief=" + brief + ", companies=" + companies + "]";
	}
	
}
