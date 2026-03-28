package com.hms.user.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hms.user.client.EmailClient;
import com.hms.user.entity.Booking;
import com.hms.user.repository.BookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository repository;
    private final EmailClient emailClient;

    public Booking bookHotel(Booking booking){

        booking.setStatus("CONFIRMED");
        booking.setPaymentMode("PAY_AT_HOTEL");
        booking.setBookingDate(LocalDate.now());

        Booking saved = repository.save(booking);

        // Call Email Service
        emailClient.sendConfirmation(saved);

        return saved;
    }

    public List<Booking> myBookings(Long userId){
        return repository.findByUserId(userId);
    }
}
