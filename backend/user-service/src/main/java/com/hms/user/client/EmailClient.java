package com.hms.user.client;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.hms.user.entity.Booking;

@Component
public class EmailClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendConfirmation(Booking booking) {
        Map<String,Object> request = new HashMap<>();
        request.put("userId", booking.getUserId());
        request.put("hotelId", booking.getHotelId());
        request.put("name", booking.getName());
        request.put("email", booking.getEmail());
        request.put("mobile", booking.getMobile());
        request.put("startDate", booking.getStartDate().toString());
        request.put("endDate", booking.getEndDate().toString());

        restTemplate.postForObject(
                "http://localhost:8084/email/send",
                request,
                String.class
        );
    }
}
