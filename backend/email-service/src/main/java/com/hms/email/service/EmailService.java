package com.hms.email.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.hms.email.dto.EmailRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public String sendMail(EmailRequest request){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(request.getEmail());
        message.setSubject("Hotel Booking Confirmed");
        message.setText(
            "Dear " + request.getName() + ",\n\n" +
            "Your booking for Hotel ID: " + request.getHotelId() + " is confirmed.\n\n" +
            "Booking Details:\n" +
            "- Mobile: " + request.getMobile() + "\n" +
            "- Start Date: " + request.getStartDate() + "\n" +
            "- End Date: " + request.getEndDate() + "\n\n" +
            "Thank you for choosing StayNest!"
        );

        mailSender.send(message);

        return "Email Sent Successfully";
    }
}