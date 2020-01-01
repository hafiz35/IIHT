package com.cognizant.companyservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.companyservice.entities.IPO;

@Repository
public interface IPORepository extends JpaRepository<IPO, Integer>{

}
