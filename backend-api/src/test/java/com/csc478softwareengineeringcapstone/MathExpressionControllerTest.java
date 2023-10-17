package com.csc478softwareengineeringcapstone;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.csc478softwareengineeringcapstone.controllers.MathExpressionController;

@SpringBootTest
public class MathExpressionControllerTest {

  @Autowired
  private MathExpressionController controller;

  @Test
  public void contextLoads() {
    assertNotNull(controller);
  }

}
