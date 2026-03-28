package com.hms.user.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.user.entity.Booking;
import com.hms.user.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService service;

    // Book hotel
    @PostMapping("/book")
    public Booking book(@RequestBody Booking booking){
        return service.bookHotel(booking);
    }

    // My bookings
    @GetMapping("/bookings/{userId}")
    public List<Booking> getBookings(
            @PathVariable Long userId){
        return service.myBookings(userId);
    }
}
