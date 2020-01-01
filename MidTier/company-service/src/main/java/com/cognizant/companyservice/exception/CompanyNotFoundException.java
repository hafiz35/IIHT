package com.cognizant.companyservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Company Does Not Exists")
public class CompanyNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public CompanyNotFoundException() {
		super();
	}

	public CompanyNotFoundException(String arg0) {
		super(arg0);
	}
	
}
