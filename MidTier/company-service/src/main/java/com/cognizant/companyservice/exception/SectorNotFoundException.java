package com.cognizant.companyservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Sector does not Exists")
public class SectorNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public SectorNotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SectorNotFoundException(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

}
