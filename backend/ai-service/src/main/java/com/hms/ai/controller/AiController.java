package com.hms.ai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ai.service.AiService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @GetMapping("/chat")
    public String chat(@RequestParam String message) {
        return aiService.getChatResponse(message);
    }
}
