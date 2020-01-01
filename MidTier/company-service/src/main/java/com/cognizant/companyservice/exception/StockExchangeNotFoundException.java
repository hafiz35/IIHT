package com.cognizant.companyservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Stock Exchange does not exists")
public class StockExchangeNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public StockExchangeNotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StockExchangeNotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

}
