package com.cognizant.companyservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "IPO does not exist")
public class IPONotFoundException extends Exception{

	private static final long serialVersionUID = 1L;

	public IPONotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public IPONotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
	
}
