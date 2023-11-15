package com.maher.microsservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

public class UserAccountNotEnabledException extends AuthenticationException {
    public UserAccountNotEnabledException(String msg) {
        super(msg);
    }
}

