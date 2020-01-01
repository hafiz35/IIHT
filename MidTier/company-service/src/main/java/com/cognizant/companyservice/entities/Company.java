package com.cognizant.companyservice.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name="company")
public class Company implements Serializable{
	@Id
	@Column(name="co_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="co_name")
	private String name;
	
	@Column(name="co_turnover")
	private Double turnover;
	
	@Column(name="co_ceo")
	private String ceo;
	
	@Column(name="co_board_of_directors")
	private String boardOfDirectors;
	
	@Column(name="co_brief")
	private String brief;
	@Column(name="co_active")
	private Boolean active;
	@ManyToOne
	@JoinColumn(name="co_sc_id")
	private Sector sector;
	
	@OneToMany(mappedBy="companyStockExchange.company")
	private List<CompanyStockExchange> stockCodes;
	
	public Company() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Company(Integer id, String name, Double turnover, String ceo, String boardOfDirectors, String brief, Boolean active,
			Sector sector) {
		super();
		this.id = id;
		this.name = name;
		this.turnover = turnover;
		this.ceo = ceo;
		this.boardOfDirectors = boardOfDirectors;
		this.brief = brief;
		this.active = active;
		this.sector = sector;
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

	public Sector getSector() {
		return sector;
	}

	public void setSector(Sector sector) {
		this.sector = sector;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((boardOfDirectors == null) ? 0 : boardOfDirectors.hashCode());
		result = prime * result + ((brief == null) ? 0 : brief.hashCode());
		result = prime * result + ((ceo == null) ? 0 : ceo.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((sector == null) ? 0 : sector.hashCode());
		result = prime * result + ((turnover == null) ? 0 : turnover.hashCode());
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
		Company other = (Company) obj;
		if (boardOfDirectors == null) {
			if (other.boardOfDirectors != null)
				return false;
		} else if (!boardOfDirectors.equals(other.boardOfDirectors))
			return false;
		if (brief == null) {
			if (other.brief != null)
				return false;
		} else if (!brief.equals(other.brief))
			return false;
		if (ceo == null) {
			if (other.ceo != null)
				return false;
		} else if (!ceo.equals(other.ceo))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (sector == null) {
			if (other.sector != null)
				return false;
		} else if (!sector.equals(other.sector))
			return false;
		if (turnover == null) {
			if (other.turnover != null)
				return false;
		} else if (!turnover.equals(other.turnover))
			return false;
		return true;
	}

	public List<CompanyStockExchange> getStockCodes() {
		return stockCodes;
	}

	public void setStockCodes(List<CompanyStockExchange> stockCodes) {
		this.stockCodes = stockCodes;
	}

	@Override
	public String toString() {
		return "Company [id=" + id + ", name=" + name + ", turnover=" + turnover + ", ceo=" + ceo
				+ ", boardOfDirectors=" + boardOfDirectors + ", brief=" + brief + ", active=" + active + ", sector="
				+ sector + ", stockCodes=" + stockCodes + "]";
	}

}
