package com.csc478softwareengineeringcapstone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
    "com.csc478softwareengineeringcapstone.controllers",
    "com.csc478softwareengineeringcapstone.services" })
public class MathTugAWarApplication {

  public static void main(String[] args) {
    SpringApplication.run(MathTugAWarApplication.class, args);
  }
}
