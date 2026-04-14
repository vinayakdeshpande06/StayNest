package com.hms.ai.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.hms.ai.dto.HotelDto;

@Service
public class AiService {

    private final ChatClient chatClient;
    private final RestTemplate restTemplate;

    @Value("${admin-service.url}")
    private String adminServiceUrl;

    public AiService(ChatClient.Builder builder, RestTemplate restTemplate) {
        this.chatClient = builder.build();
        this.restTemplate = restTemplate;
    }

    public String getChatResponse(String userMessage) {
        // 1. Fetch hotel data from admin-service
        List<HotelDto> hotels = fetchHotels();

        // 2. Prepare the context/data for the AI
        String hotelData = hotels.stream()
                .map(h -> String.format("Hotel: %s, City: %s, Price: %.2f, Rooms Available: %d, Address: %s",
                        h.getName(), h.getCity(), h.getPrice(), h.getAvailableRooms(), h.getAddress()))
                .collect(Collectors.joining("\n"));

        // 3. Create a sophisticated system prompt
        String systemPrompt = """
                You are 'Ask Vin', a friendly and helpful travel assistant for StayNest.
                Your goal is to help customers find the best hotels based on their needs.
                
                Here is the current list of available hotels:
                %s
                
                Guidelines:
                - If the user asks for hotels in a specific city, filter the list above and present the options.
                - If the user asks for hotels below a certain price (e.g., 5000), filter accordingly.
                - Be polite, professional, and concise.
                - If you don't find any matching hotels, suggest other cities or general advice.
                - Do not mention that you are an AI; act as 'Ask Vin'.
                """.formatted(hotelData);

        // 4. Call Spring AI to get the response
        return chatClient.prompt()
                .system(systemPrompt)
                .user(userMessage)
                .call()
                .content();
    }

    private List<HotelDto> fetchHotels() {
        try {
            HotelDto[] hotels = restTemplate.getForObject(adminServiceUrl, HotelDto[].class);
            return hotels != null ? Arrays.asList(hotels) : List.of();
        } catch (Exception e) {
            System.err.println("Error fetching hotels: " + e.getMessage());
            return List.of();
        }
    }
}
