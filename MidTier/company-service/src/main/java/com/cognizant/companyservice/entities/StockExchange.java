package com.cognizant.companyservice.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name="stock_exchange")
public class StockExchange implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="se_id")
	private Integer id;
	
	@Column(name="se_name")
	private String name;
	
	@Column(name="se_brief")
	private String brief;
	
	@Column(name="se_remarks")
	private String remarks;
	
	@Column(name="se_contact_address")
	private String contactAddress;
	@OneToMany(mappedBy = "companyStockExchange.stockExchange")
	private List<CompanyStockExchange> companyStocks;
	public StockExchange() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StockExchange(Integer id, String name, String brief, String remarks, String contactAddress) {
		super();
		this.id = id;
		this.name = name;
		this.brief = brief;
		this.remarks = remarks;
		this.contactAddress = contactAddress;
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

	public String getContactAddress() {
		return contactAddress;
	}

	public void setContactAddress(String contactAddress) {
		this.contactAddress = contactAddress;
	}

	public List<CompanyStockExchange> getCompanyStocks() {
		return companyStocks;
	}

	public void setCompanyStocks(List<CompanyStockExchange> companyStocks) {
		this.companyStocks = companyStocks;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((brief == null) ? 0 : brief.hashCode());
		result = prime * result + ((contactAddress == null) ? 0 : contactAddress.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((remarks == null) ? 0 : remarks.hashCode());
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
		StockExchange other = (StockExchange) obj;
		if (brief == null) {
			if (other.brief != null)
				return false;
		} else if (!brief.equals(other.brief))
			return false;
		if (contactAddress == null) {
			if (other.contactAddress != null)
				return false;
		} else if (!contactAddress.equals(other.contactAddress))
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
		if (remarks == null) {
			if (other.remarks != null)
				return false;
		} else if (!remarks.equals(other.remarks))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "StockExchange [id=" + id + ", name=" + name + ", brief=" + brief + ", remarks=" + remarks
				+ ", contactAddress=" + contactAddress + "]";
	}

}
