package com.cognizant.excelservice.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.cognizant.excelservice.dto.StockExchangeDTO;
import com.cognizant.excelservice.dto.StockPriceDTO;
import com.cognizant.excelservice.dto.SummaryDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ExcelServiceImpl {

	@Autowired
	private RestTemplate restTemplate;
	private Date minImportDate = null;
	private Date maxImportDate = null;

	@Transactional
	public Workbook downloadStockPriceDetails(int[] stockPriceId, int[] companyId, int[] sectorId, String from,
			String to) throws IOException {

		ObjectMapper mapper = new ObjectMapper();

		JsonNode object = null;
		String stockEchangeList = Arrays.stream(stockPriceId).mapToObj(String::valueOf)
				.collect(Collectors.joining(","));
		if (sectorId != null) {
			String sectorList = Arrays.stream(sectorId).mapToObj(String::valueOf).collect(Collectors.joining(","));
			object = restTemplate.getForObject("http://company-service/stock-price/sector?sectorList=" + sectorList
					+ "&stockExchangeList=" + stockEchangeList + "&from=" + from + "&to=" + to, JsonNode.class);

		} else {
			String companyList = Arrays.stream(companyId).mapToObj(String::valueOf).collect(Collectors.joining(","));
			object = restTemplate.getForObject("http://company-service/stock-price?companyList=" + companyList
					+ "&stockExchangeList=" + stockEchangeList + "&from=" + from + "&to=" + to, JsonNode.class);
		}

		List<ArrayList<Object>> stockPriceList = mapper.convertValue(object,
				new TypeReference<List<ArrayList<Object>>>() {
				});

		if (stockPriceList.isEmpty()) {
			stockPriceList = new ArrayList<>();
		}

		Workbook workbook = new XSSFWorkbook();

		Sheet sheet = workbook.createSheet("Stock Price Details");
		sheet.setDefaultColumnWidth(30);

		CellStyle style = workbook.createCellStyle();

		Row header = sheet.createRow(0);
		header.createCell(1).setCellValue("Price");
		header.getCell(1).setCellStyle(style);
		header.createCell(2).setCellValue("Date");
		header.getCell(2).setCellStyle(style);
		if (sectorId != null) {
			header.createCell(0).setCellValue("Sector");
			header.getCell(0).setCellStyle(style);

		} else {
			header.createCell(0).setCellValue("Company Code");
			header.getCell(0).setCellStyle(style);
		}

		int rowCount = 1;

		for (ArrayList<Object> stockPrice : stockPriceList) {
			Row stockPriceRow = sheet.createRow(rowCount++);
			stockPriceRow.createCell(0).setCellValue((String) stockPrice.get(0));
			stockPriceRow.createCell(1).setCellValue((String) stockPrice.get(1));
			stockPriceRow.createCell(2).setCellValue((Double) stockPrice.get(2));
		}
		return workbook;
	}

	@SuppressWarnings("deprecation")
	public SummaryDTO saveExcel(MultipartFile file) throws IOException {

		SummaryDTO uploadSummaryDto = new SummaryDTO();
		int wrongInput = 0;

		List<Boolean> successfulImports = new ArrayList<Boolean>();

		List<Integer> unsuccessfulImportsRowNumber = new ArrayList<Integer>();

		File convFile = new File(file.getOriginalFilename());
		convFile.createNewFile();
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		try {
			FileInputStream excelFile = new FileInputStream(convFile);

			Workbook workbook = new XSSFWorkbook(excelFile);

			Sheet datatypeSheet = workbook.getSheetAt(0);

			int x = datatypeSheet.getLastRowNum();

			System.out.println("No of Rows in uploaded Excel Sheet : " + x);
			Iterator<Row> iterator = datatypeSheet.iterator();

			iterator.next();

			while (iterator.hasNext()) {
				StockPriceDTO stockPriceDTO = new StockPriceDTO();
				Date date = null;

				boolean ignore = false;

				Row currentRow = iterator.next();

				if (currentRow.getCell(0) != null && currentRow.getCell(0).getCellTypeEnum() == CellType.STRING) {
					String companyCode = currentRow.getCell(0).getStringCellValue();
					System.out.println("Company Code : " + companyCode);
					stockPriceDTO.setCompanyCode(companyCode);

				} else {
					if (ignore == false) {
						ignore = true;
					}

				}

				if (currentRow.getCell(1) != null && currentRow.getCell(1).getCellTypeEnum() == CellType.STRING) {
					String stockExchangeName = currentRow.getCell(1).getStringCellValue();

					StockExchangeDTO stockExchangeCode = restTemplate.getForObject(
							"http://company-service/stock-exchange/name?name=" + stockExchangeName,
							StockExchangeDTO.class);
					stockPriceDTO.setStockExchange(stockExchangeCode.getId());
					uploadSummaryDto.setStockExchangeName(stockExchangeName);

				} else {
					if (ignore == false) {
						ignore = true;
					}
				}

				if (currentRow.getCell(2) != null && currentRow.getCell(2).getCellTypeEnum() == CellType.NUMERIC) {
					double pricePerShare = currentRow.getCell(2).getNumericCellValue();
					System.out.println("Price per share : " + pricePerShare);
					stockPriceDTO.setPrice(pricePerShare);
				} else {
					if (ignore == false) {
						ignore = true;
					}
				}

				if (currentRow.getCell(3) != null && currentRow.getCell(3).getCellTypeEnum() == CellType.NUMERIC) {
					date = currentRow.getCell(3).getDateCellValue();
					stockPriceDTO.setDate(date);
					setMinMaxUploadSummaryDate(date, uploadSummaryDto);

				} else {
					if (ignore == false) {
						ignore = true;
					}
				}

				if (ignore == false) {
					successfulImports.add(true);

				} else {
					wrongInput++;
					successfulImports.add(false);
				}
				restTemplate.postForObject("http://company-service/stock-price",
						stockPriceDTO, StockPriceDTO.class);
			}
			workbook.close();

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			successfulImports.stream().forEach(x -> System.out.println(x));

			int[] counter = new int[1];
			counter[0] = 0;

			successfulImports.stream().forEach(x -> {
				if (!x) {
					unsuccessfulImportsRowNumber.add(counter[0]);
				}

				counter[0]++;
			});

			uploadSummaryDto.setUnsuccessfull(unsuccessfulImportsRowNumber);
			uploadSummaryDto.setImportedResource(successfulImports.size() - wrongInput);

		}
		return uploadSummaryDto;

	}

	@SuppressWarnings("deprecation")
	public SummaryDTO setMinMaxUploadSummaryDate(Date date, SummaryDTO uploadSummaryDto) {
		if (minImportDate == null && maxImportDate == null) {
			minImportDate = date;
			maxImportDate = date;
		}

		if (minImportDate != null && date.getDate() < minImportDate.getDate()) {
			minImportDate = date;
		}

		if (maxImportDate != null && date.getDate() > maxImportDate.getDate()) {
			maxImportDate = date;
		}
		uploadSummaryDto.setFromDate(minImportDate);
		uploadSummaryDto.setToDate(maxImportDate);
		return uploadSummaryDto;
	}

}
