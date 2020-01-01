package com.cognizant.companyservice.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.companyservice.entities.Company;
import com.cognizant.companyservice.exception.CompanyNotFoundException;
import com.cognizant.companyservice.repository.CompanyRepository;

@Service
public class CompanyService {
	@Autowired
	private CompanyRepository companyRepository;

	@Transactional
	public List<Company> findAllCompanies() {
		return this.companyRepository.findAll();
	}
	@Transactional
	public List<Company> findAllActiveCompanies() {
		return this.companyRepository.findByActive(true);
	}
	@Transactional
	public Company findCompanyById(Integer id) throws CompanyNotFoundException {
		Optional<Company> company = this.companyRepository.findById(id);
		if(!company.isPresent()) {
			throw new CompanyNotFoundException();
		} else {
			return company.get();
		}
	}
	@Transactional
	public Company findCompanyByName(String name) throws CompanyNotFoundException {
		Optional<Company> company = this.companyRepository.findByName(name);
		if(!company.isPresent()) {
			throw new CompanyNotFoundException();
		} else {
			return company.get();
		}
	}
	@Transactional
	public Company addCompany(Company company) {
		return this.companyRepository.save(company);
	}
	@Transactional
	public Company modifyCompany(Company updatedCompany) {
		return this.companyRepository.save(updatedCompany);
	}
	@Transactional
	public void deleteCompany(Integer id) {
		this.companyRepository.deleteById(id);
	}
}
