package com.hms.email.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.email.dto.EmailRequest;
import com.hms.email.service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService service;

    @PostMapping("/send")
    public String send(@RequestBody EmailRequest request){
        return service.sendMail(request);
    }
}