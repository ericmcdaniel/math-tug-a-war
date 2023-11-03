package com.csc478softwareengineeringcapstone.controllers;

import java.util.AbstractMap;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csc478softwareengineeringcapstone.services.ExpressionTreeService;

@CrossOrigin
@RestController
public class MathExpressionController {

  private static Map<String, Map<String, Object>> equationsMap = new HashMap<>();

  @Autowired
  private ExpressionTreeService treeService;

  @GetMapping("/generate-equation")
  public ResponseEntity<Map<String, Object>> generateEquation(
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
    response.put("id", equationID);
    response.put("equation", equation);

    return ResponseEntity.ok(response);
  }

  @PostMapping("/validate-answer")
  public ResponseEntity<Map<String, Object>> validateAnswer(@RequestBody Map<String, Object> requestBody) {
    String equationID = (String) requestBody.get("id");
    double providedAnswer = Double.parseDouble((String) requestBody.get("answer"));

    Map<String, Object> equationData = equationsMap.get(equationID);
    if (equationData == null) {
      Map<String, Object> errorResponse = new HashMap<>();
      errorResponse.put("message", "Invalid equation ID");
      return ResponseEntity.status(400).body(errorResponse);
    }

    double correctResult = (double) equationData.get("result");
    Map<String, Object> response = new HashMap<>();
    if (providedAnswer == correctResult) {
      equationsMap.remove(equationID);
      response.put("message", "Correct answer");
      return ResponseEntity.ok(response);
    }
    response.put("message", "Incorrect answer");
    return ResponseEntity.ok(response);
  }

  /**
   * User "auth" was explored momentarily as a way to interact with the server before initiating
   * with the start of the game, however progress was stashed as that is out of scope for V1.
   * A simple health test to nudge the cloud server awake will suffice for now.
   */
  @GetMapping("/health-test")
  public ResponseEntity<Map.Entry<String, String>> wakeupServer() {
    return ResponseEntity.ok(new AbstractMap.SimpleEntry<String, String>("status", "OK"));
  }
}
