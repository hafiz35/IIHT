package com.cognizant.companyservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Stock Price does not exists for given data")
public class StockPriceNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public StockPriceNotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StockPriceNotFoundException(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

}
