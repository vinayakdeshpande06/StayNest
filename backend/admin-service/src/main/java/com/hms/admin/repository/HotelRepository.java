package com.hms.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.admin.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
