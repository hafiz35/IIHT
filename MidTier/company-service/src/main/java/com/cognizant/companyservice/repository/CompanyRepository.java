package com.cognizant.companyservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.companyservice.entities.Company;
@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
	Optional<Company> findByName(String name);
	List<Company> findByActive(Boolean active);
}
