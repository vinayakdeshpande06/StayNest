package com.hms.auth.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String SECRET =
	        "mysecretkey123456mysecretkey123456";
    public String generateToken(String email){

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(
                   new Date(System.currentTimeMillis() + 86400000)
                ) // 1 day
                .signWith(
                   Keys.hmacShaKeyFor(SECRET.getBytes()),
                   SignatureAlgorithm.HS256
                )
                .compact();
    }
}