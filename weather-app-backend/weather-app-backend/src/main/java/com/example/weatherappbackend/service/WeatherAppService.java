package com.example.weatherappbackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.weatherappbackend.model.WeatherAppResponse;

@Service
public class WeatherAppService {
    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    public Double getTemperature(String city) {
        String url = String.format("%s?key=%s&q=%s", apiUrl, apiKey, city);
    
        RestTemplate restTemplate = new RestTemplate();
        WeatherAppResponse response = restTemplate.getForObject(url, WeatherAppResponse.class);
    
        return response != null ? response.getCurrent().getTemp_c() : null;
    }
    
}
 