package com.csc478softwareengineeringcapstone;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTimeoutPreemptively;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Duration;
import java.util.Arrays;

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
    // Depth set to four because the test calculates the root as depth 1, 
    // whereas I built the actual function with the root being depth 0.
    int depth = 4;
    tree.generateExpression("hard");
    Node rootNode = tree.getRoot();
    int actualDepth = calculateDepth(rootNode);
    assertTrue(actualDepth <= depth,
        "Generated expression should have a depth less than or equal to the specified maximum depth: " + actualDepth);
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
}
