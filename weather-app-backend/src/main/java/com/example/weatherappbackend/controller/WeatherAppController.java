package com.example.weatherappbackend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.weatherappbackend.service.WeatherAppService;

@RestController
@RequestMapping("/weather")
public class WeatherAppController {
    @Autowired
    private WeatherAppService weatherAppService;

    @GetMapping("/today")
    public Map<String, Object> getTemperatureGet(@RequestParam String city) {
        return getTemperatureData(city);
    }

    @PostMapping("/today")
    public Map<String, Object> getTemperaturePost(@RequestBody Map<String, String> request) {
        String city = request.get("location");
        return getTemperatureData(city);
    }

    private Map<String, Object> getTemperatureData(String city) {
        Double temp = weatherAppService.getTemperature(city);
        Map<String, Object> response = new HashMap<>();

        if (temp != null) {
            response.put("city", city);
            response.put("temperature", temp);
            response.put("unit", "Celsius");
        } else {
            response.put("error", "Temperature data not available");
        }

        return response;
    }
}
