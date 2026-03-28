package com.hms.email.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequest {

    private Long userId;
    private Long hotelId;
    private String name;
    private String email;
    private String mobile;
    private String startDate; // LocalDate can be sent as String or LocalDate
    private String endDate;
}
