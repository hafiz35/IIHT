package com.cognizant.excelservice.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cognizant.excelservice.dto.SummaryDTO;
import com.cognizant.excelservice.service.ExcelServiceImpl;

@RestController
@RequestMapping("/excel")
public class ExcelController {

	@Autowired
	private ExcelServiceImpl excelService;
	
	@GetMapping("/download")
	public void downloadStockPriceDetails(@RequestParam("stockExchangeList") int[] stockPriceId,@RequestParam(name="companyList", required=false) int[] companyId,@RequestParam(name="sectorList", required=false) int[] sectorId,
			@RequestParam String from,@RequestParam String to,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		Workbook workbook=excelService.downloadStockPriceDetails(stockPriceId, companyId,sectorId, from, to);
		response.setHeader("Access-Control-Expose-Headers", "*");
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment;filename=stock-price-file.xlsx");
		workbook.write(response.getOutputStream());
		workbook.close();
	}
	@PostMapping("/upload")
	public SummaryDTO handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
		return excelService.saveExcel(file);
	}
}
