package com.csc478softwareengineeringcapstone;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.Mockito;

import com.csc478softwareengineeringcapstone.services.ExpressionTreeService;
import com.csc478softwareengineeringcapstone.services.RandomInt;

@TestInstance(Lifecycle.PER_CLASS)
public class ExpressionTreeServiceTest {

  private ExpressionTreeService tree;
  private RandomInt random;

  @BeforeAll
  public void setup() {
    random = Mockito.mock(RandomInt.class);
    when(random.nextInt(9)).thenReturn(0);
    tree = new ExpressionTreeService(random);
  }

  @Test
  public void isNotNullExpression() {
    String equation = tree.generateExpression(3);
    assertNotNull(equation);
  }

  @Test
  public void isValidExpressionLength() {
    String equationDepth1 = tree.generateExpression(1);
    assertTrue(equationDepth1.length() == "(1 + 1)".length());
  }

  @Test
  public void isValidExpressionOutput() {
    String equation = tree.generateExpression(1);
    assertEquals("(1 + 1)", equation);
  }

  //
  //
  //
  // ↓ Rest of the ExpressionTreeService tests to target smaller functions ↓
  //
  //
  //

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
