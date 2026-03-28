package com.hms.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hms.admin.entity.Hotel;
import com.hms.admin.repository.HotelRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository repository;

    public Hotel create(Hotel hotel){
        return repository.save(hotel);
    }

    public List<Hotel> getAll(){
        return repository.findAll();
    }

    public Hotel update(Long id, Hotel hotel){
        Hotel existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        existing.setName(hotel.getName());
        existing.setCity(hotel.getCity());
        existing.setAddress(hotel.getAddress());
        existing.setAvailableRooms(hotel.getAvailableRooms());
        existing.setPrice(hotel.getPrice());

        return repository.save(existing);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Hotel changeVisibility(Long id, boolean visible){
        Hotel hotel = repository.findById(id)
                .orElseThrow();
        hotel.setVisible(visible);
        return repository.save(hotel);
    }
}
