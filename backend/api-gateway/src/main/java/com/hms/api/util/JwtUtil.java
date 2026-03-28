package com.hms.api.util;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String SECRET =
	        "mysecretkey123456mysecretkey123456";    // SAME as Auth Service

    public boolean validateToken(String token) {

        try {
            Jwts.parserBuilder()
                    .setSigningKey(
                      Keys.hmacShaKeyFor(SECRET.getBytes()))
                    .build()
                    .parseClaimsJws(token);

            return true;

        } catch (Exception e) {
            return false;
        }
    }
}
