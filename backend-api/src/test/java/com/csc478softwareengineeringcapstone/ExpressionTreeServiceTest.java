package com.csc478softwareengineeringcapstone;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTimeoutPreemptively;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.time.Duration;
import java.util.Arrays;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.Mockito;

import com.csc478softwareengineeringcapstone.services.ExpressionTreeService;
import com.csc478softwareengineeringcapstone.services.Node;
import com.csc478softwareengineeringcapstone.services.RandomInt;

@TestInstance(Lifecycle.PER_CLASS)
public class ExpressionTreeServiceTest {

  private ExpressionTreeService tree;
  private RandomInt random;

  @BeforeEach
  public void setup() {

    random = Mockito.mock(RandomInt.class);
    tree = new ExpressionTreeService(random);
  }

  @Test
  void testConstructorCreatesInstance() {
    assertNotNull(tree, "Expected service to be initialized");
  }

  @Test
  void testGenerateExpressionDoesNotThrowException() {
    assertDoesNotThrow(() -> tree.generateExpression("easy"));
    assertDoesNotThrow(() -> tree.generateExpression("medium"));
    assertDoesNotThrow(() -> tree.generateExpression("hard"));
  }

  @Test
  void testGeneratedExpressionHasExpectedDepth() {
    int depth = 3;
    tree.generateExpression("hard");
    Node rootNode = tree.getRoot();
    int actualDepth = calculateDepth(rootNode);
    assertTrue(actualDepth <= depth,
        "Generated expression should have a depth less than or equal to the specified maximum depth");
  }

  @Test
  void testGeneratedExpressionContainsValidOperatorsAndNumbers() {
    tree.generateExpression("hard");
    Node rootNode = tree.getRoot();
    assertTrue(isValidExpression(rootNode), "Generated expression should contain valid operators and numbers");
  }

  @Test
  void testGenerateExpressionMultipleRuns() {
    for (int i = 0; i < 1000; i++) {
      assertTimeoutPreemptively(Duration.ofSeconds(1), () -> {
        tree.generateExpression("medium");
      }, "generateExpression() took too long in iteration " + i);
    }
  }

  private int calculateDepth(Node node) {
    if (node == null) {
      return 0;
    } else {
      int leftDepth = calculateDepth(node.getLeft());
      int rightDepth = calculateDepth(node.getRight());
      return Math.max(leftDepth, rightDepth) + 1;
    }
  }

  public boolean isValidExpression(Node node) {
    String[] operators = { "+", "-", "*", "/" };

    if (node == null) {
      return true;
    }

    if (Arrays.asList(operators).contains(node.getValue())) {
      if (node.getLeft() == null || node.getRight() == null) {
        return false;
      }
      return isValidExpression(node.getLeft()) && isValidExpression(node.getRight());
    } else {
      try {
        int num = Integer.parseInt(node.getValue());
        if (node.getLeft() != null || node.getRight() != null) {
          return false;
        }
        return true;
      } catch (NumberFormatException e) {
        return false;
      }
    }
  }

  // I would also highly encourage you to move as much of the HashMap logic from the controller into
  // a service. It's part of the MVC pattern - controllers direct the traffic while services handle
  // all of the business logic. You can perhaps make a second "Response" Service class (whatever you
  // want to name it), which handles and formats the official response, while managing the official
  // Expression Tree class to construct the tree. This is in line with that the original UML diagram
  // suggests.

  /*                                   As a diagram:
   * Expression Controller     →     Expression Generator Service     →     Expression Tree     →     Node
   * (Routes the request)           (Manages the Expression Tree)            (Computes the         (Elements of
   *                                                                          expression)         the expression)
   */
}
