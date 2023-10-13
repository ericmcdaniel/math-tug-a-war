package com.csc478softwareengineeringcapstone;

import java.util.Random;

public class ExpressionTree {
    private Node root;
    private String[] operators = { "+", "-", "*", "/" };
    private Random rand = new Random();

    public ExpressionTree(int depth) {
        this.root = generateNode(depth, true);
    }

    public Node getRoot() {

        return this.root;
    }

    // This creates the actual tree, the boolean is to force an operator for the
    // root.
    private Node generateNode(int depth, boolean firstInvocation) {

        // Force leafs to be a number between 1 and 9
        if (depth == 0) {
            return new Node(String.valueOf(rand.nextInt(9) + 1));
        }

        // Choose between creating an operator or operand.
        if (!firstInvocation && rand.nextBoolean()) {
            return new Node(String.valueOf(rand.nextInt(9) + 1));
        } else {
            String op = operators[rand.nextInt(operators.length)];
            Node node = new Node(op);

            node.left = generateNode(depth - 1, false);
            node.right = generateNode(depth - 1, false);

            if ("-".equals(op)) {
                double leftValue = evaluate(node.left);
                double rightValue = evaluate(node.right);

                // Force left child of "-" to be greater than or equal to right child
                while (leftValue < rightValue) {
                    node.left = generateNode(depth - 1, false);
                    leftValue = evaluate(node.left);
                }
            } else if ("/".equals(op)) {
                double leftValue = evaluate(node.left);
                double rightValue = evaluate(node.right);

                /*
                 * Ensure the right subtree is a divisor of the left subtree
                 * This can result in a lot of divide by 1 expressions. May look at generating
                 * new leftValues as well, but have to be careful with leafs.
                 */
                while (leftValue % rightValue != 0 || rightValue == 0) {
                    node.right = generateNode(depth - 1, false);
                    rightValue = evaluate(node.right);
                }
            } else if ("*".equals(op)) {
                double leftValue = evaluate(node.left);
                double rightValue = evaluate(node.right);

                // Making sure left and right child of "*" are less than or equal to 12
                while (leftValue > 12 || rightValue > 12) {
                    if (leftValue > 12) {
                        node.left = generateNode(depth - 1, false);
                        leftValue = evaluate(node.left);
                    }
                    if (rightValue > 12) {
                        node.right = generateNode(depth - 1, false);
                        rightValue = evaluate(node.right);
                    }
                }
            }

            return node;
        }
    }

    public String generateExpression() {
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