package com.csc478softwareengineeringcapstone;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class MathTugAWarApplication {

	public static void main(String[] args) {
		SpringApplication.run(MathTugAWarApplication.class, args);
	}

	@GetMapping("/hello")
	public Map<String, Object> hello(@RequestParam(value = "name", defaultValue = "CSC 478 Group 9") String name) {

		/*
		 * We want to return a JSON object and not raw text. Hashmaps are perfect for
		 * this.
		 * The response data will look like:
		 * {
		 * "response": "Hello, <dynamically injected data>",
		 * "http_status": 200
		 * }
		 */
		Map<String, Object> map = new HashMap<>();

		map.put("response", String.format("Hello %s!", name));
		map.put("http_status", 200);

		return map;
	}

}
