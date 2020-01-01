package com.cognizant.companyservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Company Stock Code does not exists")
public class CompanyStockExchangeNotFound extends Exception {

	private static final long serialVersionUID = 1L;

	public CompanyStockExchangeNotFound() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompanyStockExchangeNotFound(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

}
