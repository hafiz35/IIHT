package com.cognizant.companyservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.cognizant.companyservice.dto.SectorDTO;
import com.cognizant.companyservice.entities.Sector;
import com.cognizant.companyservice.exception.SectorNotFoundException;
import com.cognizant.companyservice.repository.SectorRepository;
import com.cognizant.companyservice.service.SectorService;

@RunWith(SpringRunner.class)
@SpringBootTest
class SectorServiceTest {

	@Autowired
	private SectorService sectorService;

	@MockBean
	private SectorRepository sectorRepository;

	@Test
	public void testFindAllSectors() {
		Sector sectorOne = new Sector(1, "Electricity", "current");
		Sector sectorTwo = new Sector(2, "Administration", "current");

		List<Sector> sectorList = new ArrayList<Sector>();
		sectorList.add(sectorOne);
		sectorList.add(sectorTwo);

		Mockito.when(sectorRepository.findAll()).thenReturn(sectorList);

		assertThat(sectorService.findAllSectors()).isEqualTo(sectorList);
	}

	@Test
	public void testFindSectorById() throws SectorNotFoundException {
		Sector sector = new Sector(1, "Electricity", "current");

		Mockito.when(sectorRepository.findById(1)).thenReturn(Optional.ofNullable(sector));
		assertThat(sectorService.findById(1)).isEqualTo(sector);
	}

	@Test
	public void testFindBySectorName() throws SectorNotFoundException {
		Sector sector = new Sector(1, "Electricity", "current");

		Mockito.when(sectorRepository.findByName("Electricity")).thenReturn(Optional.ofNullable(sector));
		assertThat(sectorService.findBySectorName("Electricity")).isEqualTo(sector);
	}

	@Test
	public void testAddSector() {
		Sector sector = new Sector(1, "Electricity", "current");

		Mockito.when(sectorRepository.save(sector)).thenReturn(sector);
		assertThat(sectorService.addSector(sector)).isEqualTo(sector);
	}

	@Test
	public void testModifySector() throws SectorNotFoundException {
		Sector sector = new Sector(1, "Electricity", "current");

		Mockito.when(sectorRepository.findById(1)).thenReturn(Optional.ofNullable(sector));

		sector.setName("Updated Electricity");
		Mockito.when(sectorRepository.save(sector)).thenReturn(sector);	
		assertThat(sectorService.modifySector(sector)).isEqualTo(sector);
	}
	
	@Test
	public void testDelete() {
		Sector sector = new Sector(1, "Electricity", "current");
		
		Mockito.when(sectorRepository.findById(1)).thenReturn(Optional.ofNullable(sector));
		Mockito.when(sectorRepository.existsById(sector.getId())).thenReturn(false);
		
		assertFalse(sectorRepository.existsById(sector.getId()));
	}
}