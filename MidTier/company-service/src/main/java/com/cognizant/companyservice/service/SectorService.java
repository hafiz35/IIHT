package com.cognizant.companyservice.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.companyservice.entities.Sector;
import com.cognizant.companyservice.exception.SectorNotFoundException;
import com.cognizant.companyservice.repository.SectorRepository;

@Service
public class SectorService {
	@Autowired
	private SectorRepository sectorRepository;
	
	@Transactional
	public List<Sector> findAllSectors() {
		return this.sectorRepository.findAll();
	}
	@Transactional
	public Sector findById(Integer id)throws SectorNotFoundException {
		Optional<Sector> sectorOptional = this.sectorRepository.findById(id);
		if(!sectorOptional.isPresent()) {
			throw new SectorNotFoundException();
		} else {
			return sectorOptional.get();
		}
	}
	@Transactional
	public Sector findBySectorName(String name) throws SectorNotFoundException {
		Optional<Sector> sectorOptional = this.sectorRepository.findByName(name);
		if(!sectorOptional.isPresent()) {
			throw new SectorNotFoundException();
		} else {
			return sectorOptional.get();
		}
	}
	@Transactional
	public Sector addSector(Sector sector) {
		return this.sectorRepository.save(sector);
	}
	@Transactional
	public Sector modifySector(Sector updatedSector) {
		return this.sectorRepository.save(updatedSector);
	}
	@Transactional
	public void deleteSector(Integer id) {
		this.sectorRepository.deleteById(id);
	}
}
