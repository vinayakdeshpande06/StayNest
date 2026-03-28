package com.hms.user.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long hotelId;

    private String name;
    private String email;
    private String mobile;

    private LocalDate startDate;
    private LocalDate endDate;

    private LocalDate bookingDate;

    private String status;       // CONFIRMED
    private String paymentMode;  // PAY_AT_HOTEL
}