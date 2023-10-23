package com.csc478softwareengineeringcapstone.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csc478softwareengineeringcapstone.services.ExpressionTreeService;

@RestController
public class MathExpressionController {

  private static Map<String, Object> equationsMap = new HashMap<>();

  @Autowired
  private ExpressionTreeService treeService;

  @GetMapping("/generate-equation")
  public Map<String, Object> generateEquation(
      @RequestParam(value = "difficulty", defaultValue = "easy") String difficulty) {
    String equation = treeService.generateExpression(difficulty);
    double result = treeService.evaluate(treeService.getRoot());

    // Generating a unique ID for the equation
    String equationID = UUID.randomUUID().toString();
    Map<String, Object> equationData = new HashMap<>();
    equationData.put("equation", equation);
    equationData.put("result", result);

    // Storing the generated equation and its result in the map
    equationsMap.put(equationID, equationData);

    Map<String, Object> response = new HashMap<>();
    response.put("equationID", equationID);
    response.put("equation", equation);
    response.put("http_status", 200);

    return response;
  }

  @PostMapping("/validate-answer")
  public Map<String, Object> validateAnswer(@RequestBody Map<String, Object> requestBody) {
    String equationID = (String) requestBody.get("equationID");
    double providedAnswer = Double.parseDouble((String) requestBody.get("answer"));

    Map<String, Object> equationData = (Map<String, Object>) equationsMap.get(equationID);
    if (equationData == null) {
      Map<String, Object> errorResponse = new HashMap<>();
      errorResponse.put("message", "Invalid equation ID");
      errorResponse.put("http_status", 400);
      return errorResponse;
    }

    double correctResult = (double) equationData.get("result");
    Map<String, Object> response = new HashMap<>();
    if (providedAnswer == correctResult) {
      equationsMap.remove(equationID);
      response.put("message", "Correct answer");
      response.put("http_status", 200);
    } else {
      response.put("message", "Incorrect answer");
      response.put("http_status", 200);
    }

    return response;
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
