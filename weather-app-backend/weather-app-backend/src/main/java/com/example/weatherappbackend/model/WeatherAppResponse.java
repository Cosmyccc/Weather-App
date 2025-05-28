package com.example.weatherappbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherAppResponse {
    
    @JsonProperty("current")
    private Current current;

    public Current getCurrent() {
        return current;
    }

    public void setCurrent(Current current) {
        this.current = current;
    }

    public static class Current {
        @JsonProperty("temp_c")
        private Double temp_c;

        public Double getTemp_c() {
            return temp_c;
        }

        public void setTemp_c(Double temp_c) {
            this.temp_c = temp_c;
        }
    }
}
