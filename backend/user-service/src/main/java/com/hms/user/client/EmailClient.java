package com.hms.user.client;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.hms.user.entity.Booking;

@Component
public class EmailClient {

    private static final Logger log = LoggerFactory.getLogger(EmailClient.class);
    private final RestTemplate restTemplate = new RestTemplate();

    public void sendConfirmation(Booking booking) {
        Map<String, Object> request = new HashMap<>();
        request.put("userId", booking.getUserId());
        request.put("hotelId", booking.getHotelId());
        request.put("name", booking.getName());
        request.put("email", booking.getEmail());
        request.put("mobile", booking.getMobile());
        request.put("startDate", booking.getStartDate().toString());
        request.put("endDate", booking.getEndDate().toString());

        try {
            restTemplate.postForObject(
                    "http://email-service:8084/email/send",  // Docker service name
                    request,
                    String.class
            );
            log.info("Confirmation email sent to {}", booking.getEmail());
        } catch (Exception e) {
            // Email failure should NOT fail the booking — it is already saved
            log.error("Failed to send confirmation email for booking id={}: {}",
                    booking.getId(), e.getMessage());
        }
    }
}
