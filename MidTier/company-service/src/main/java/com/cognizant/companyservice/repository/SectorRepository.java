package com.cognizant.companyservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.companyservice.entities.Sector;
@Repository
public interface SectorRepository extends JpaRepository<Sector, Integer> {
	Optional<Sector> findByName(String name);
}
