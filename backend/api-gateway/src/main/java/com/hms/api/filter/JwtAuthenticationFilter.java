package com.hms.api.filter;

import com.hms.api.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements WebFilter {

    private final JwtUtil jwtUtil;

    private static final List<String> publicApis =
            List.of("/auth/login",
                    "/auth/register");

    @Override
    public Mono<Void> filter(ServerWebExchange exchange,
                             WebFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();
     
        System.out.println("===== JWT FILTER =====");
        System.out.println("PATH = " + path);

      
        
        
        
        // PUBLIC APIs
        if (path.contains("/auth/login") ||
        	    path.contains("/auth/register")) {

        	    System.out.println("PUBLIC API → SKIP JWT");
        	    return chain.filter(exchange);
        	}

         
        String authHeader =
                exchange.getRequest()
                        .getHeaders()
                        .getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("NO AUTH HEADER → 401");

            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        
        
        
       
        String token = authHeader.substring(7);

        if (!jwtUtil.validateToken(token)) {
        	 System.out.println("INVALID TOKEN → 401");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        
        

        return chain.filter(exchange);
    }
}