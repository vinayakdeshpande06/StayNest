package com.hms.admin.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.admin.entity.Hotel;
import com.hms.admin.service.HotelService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService service;

    @PostMapping
    public Hotel create(@RequestBody Hotel hotel){
        return service.create(hotel);
    }

    @PutMapping("/{id}")
    public Hotel update(@PathVariable Long id,
                        @RequestBody Hotel hotel){
        return service.update(id, hotel);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

    @PutMapping("/{id}/visibility")
    public Hotel visibility(@PathVariable Long id,
                            @RequestParam boolean visible){
        return service.changeVisibility(id, visible);
    }

    @GetMapping
    public List<Hotel> getAll(){
        return service.getAll();
    }
}
