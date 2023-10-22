package com.csc478softwareengineeringcapstone.services;

import java.util.Arrays;

import org.springframework.stereotype.Service;

@Service
public class ExpressionTreeService {
    private Node root;
    private String[] operators = { "+", "-", "*", "/" };
    private RandomInt random;

    public ExpressionTreeService(RandomInt random) {
        this.root = new Node("+");
        this.random = random;
    }

    public Node getRoot() {
        return this.root;
    }

    private int generateNumber() {
        return random.nextInt(9) + 1;
    }

    private String generateOperator() {
        return operators[random.nextInt(operators.length)];
    }

    private void handleSubtraction(Node node, int depth) {
        double leftValue = evaluate(node.left);
        double rightValue = evaluate(node.right);

        while (leftValue < rightValue) {
            generateNode(node.left, depth - 1);
            leftValue = evaluate(node.left);
        }
    }

    private void handleDivision(Node node, int depth) {
        double leftValue = evaluate(node.left);
        double rightValue = evaluate(node.right);

        while (leftValue % rightValue != 0 || rightValue == 0) {
            generateNode(node.right, depth - 1);
            rightValue = evaluate(node.right);
        }
    }

    private void handleMultiplication(Node node, int depth) {
        double leftValue = evaluate(node.left);
        double rightValue = evaluate(node.right);

        while (leftValue > 12 || rightValue > 12) {
            if (leftValue > 12) {
                generateNode(node.left, depth - 1);
                leftValue = evaluate(node.left);
            }
            if (rightValue > 12) {
                generateNode(node.right, depth - 1);
                rightValue = evaluate(node.right);
            }
        }
    }

    private void generateNode(Node currentNode, int depth) {

        if (depth == 0) {
            currentNode.value = String.valueOf(generateNumber());
            return;
        }

        if (Arrays.asList(operators).contains(currentNode.value)) {
            currentNode.left = new Node(random.nextBoolean() ? generateOperator() : String.valueOf(generateNumber()));
            generateNode(currentNode.left, depth - 1);

            currentNode.right = new Node(random.nextBoolean() ? generateOperator() : String.valueOf(generateNumber()));
            generateNode(currentNode.right, depth - 1);

            if ("-".equals(currentNode.value)) {
                handleSubtraction(currentNode, depth);
            } else if ("/".equals(currentNode.value)) {
                handleDivision(currentNode, depth);
            } else if ("*".equals(currentNode.value)) {
                handleMultiplication(currentNode, depth);
            }
        }
    }

    public String generateExpression(int depth) {
        generateNode(this.root, depth);
        return inOrderTraversal(this.root);
    }

    private String inOrderTraversal(Node node) {

        if (node == null) {
            return "";
        }

        String left = inOrderTraversal(node.left);
        String right = inOrderTraversal(node.right);

        // Writing out the expression
        if (node.left != null && node.right != null) {
            return "(" + left + " " + node.value + " " + right + ")";
        } else {
            return node.value;
        }
    }

    public double evaluate(Node node) {
        if (node == null) {
            return 0;
        }

        // If the node is a leaf node (number), return its value
        if (node.left == null && node.right == null) {
            return Double.parseDouble(node.value);
        }

        double leftValue = evaluate(node.left);
        double rightValue = evaluate(node.right);

        // A bit of error checking as we evaluate, just to be sure our generator did
        // what we expected.
        switch (node.value) {
            case "+":
                return leftValue + rightValue;
            case "-":
                if (rightValue > leftValue) {
                    throw new ArithmeticException("Negative Result");
                }
                return leftValue - rightValue;
            case "*":
                return leftValue * rightValue;
            case "/":
                if (rightValue == 0) {
                    throw new ArithmeticException("Division by zero");
                }
                return leftValue / rightValue;
            default:
                throw new IllegalArgumentException("Invalid operator: " + node.value);
        }
    }

    class Node {
        String value;
        Node left;
        Node right;

        Node(String value) {
            this.value = value;
        }
    }

    /* public static void main(String[] args) {
    
        ExpressionTree tree = new ExpressionTree(3);
        String expression = tree.generateExpression();
        double result = tree.evaluate(tree.root);
    
        System.out.println("Generated Expression: " + expression);
        System.out.println("Result: " + result);
    
    } */
}