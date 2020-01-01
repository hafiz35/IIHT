package com.cognizant.companyservice.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.companyservice.entities.IPO;
import com.cognizant.companyservice.exception.IPONotFoundException;
import com.cognizant.companyservice.repository.IPORepository;

@Service
public class IPOService {
	@Autowired
	private IPORepository ipoRepository;
	
	@Transactional
	public IPO findById(Integer id) throws IPONotFoundException {
		Optional<IPO> ipoOptional=ipoRepository.findById(id);
		if(!ipoOptional.isPresent()) {
			throw new IPONotFoundException();
		}
		else {
			return ipoOptional.get();
		}
	} 
	@Transactional
	public List<IPO> findAllIPOs(){
		return this.ipoRepository.findAll();
	}
	@Transactional
	public IPO addIPO(IPO ipo) {
		return this.ipoRepository.save(ipo);
	}
	@Transactional
	public IPO modifyIPO(IPO modifiedIPO) {
		return this.ipoRepository.save(modifiedIPO);
	}
	@Transactional
	public void deleteIPO(Integer id) {
		this.ipoRepository.deleteById(id);
	}
}
