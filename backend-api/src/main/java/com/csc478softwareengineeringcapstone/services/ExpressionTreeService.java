package com.csc478softwareengineeringcapstone.services;

import org.springframework.stereotype.Service;

@Service
public class ExpressionTreeService {
    private Node root;
    private String[] operators = { "+", "-", "*", "/" };
    private RandomInt random;
    private DifficultyProperties difficulty;

    private int MAX_DEPTH;
    private int MAX_RANDOM;
    private int MAX_MULTIPLY;
    private boolean IS_DIVISIBLE_BY_ONE;

    public ExpressionTreeService(RandomInt random) {
        this.random = random;
        this.root = null;
    }

    public Node getRoot() {
        return this.root;
    }

    private int generateNumber() {
        return random.nextInt(this.MAX_RANDOM) + 1;
    }

    private String generateOperator() {
        return operators[random.nextInt(operators.length)];
    }

    private void handleSubtraction(Node node, int depth) {
        double leftValue = evaluate(node.left);
        double rightValue = evaluate(node.right);

        // Force left child of "-" to be greater than or equal to right child
        while (leftValue < rightValue) {
            node.left = generateSubTree(depth - 1, false);
            leftValue = evaluate(node.left);
        }
    }

    private void handleDivision(Node node, int depth) {
        double leftValue = evaluate(node.left);
        double rightValue = evaluate(node.right);

        /*
         * Divide by 1 is now only allowed on easy difficulty. If we end up with 1/1, 
         * which would force rightValue to be 1 then we also remake left side to try 
         * and create more interesting equations. We can still end up with 9 / 9 for 
         * example, but that's going to be hard to avoid, although I could check.
         * Perhaps a hard mode only check?
         */
        while (leftValue % rightValue != 0 || rightValue == 0
                || (!this.IS_DIVISIBLE_BY_ONE && rightValue == 1)) {

            if (leftValue == 1 && !this.IS_DIVISIBLE_BY_ONE && rightValue == 1) {
                node.left = generateSubTree(depth - 1, false);
                leftValue = evaluate(node.left);
            }
            node.right = generateSubTree(depth - 1, false);
            rightValue = evaluate(node.right);
        }
    }

    private void handleMultiplication(Node node, int depth) {
        double leftValue = evaluate(node.left);
        double rightValue = evaluate(node.right);

        // Making sure left and right child of "*" are less than or equal to 12
        while (leftValue > this.MAX_MULTIPLY || rightValue > this.MAX_MULTIPLY) {
            if (leftValue > this.MAX_MULTIPLY) {
                node.left = generateSubTree(depth - 1, false);
                leftValue = evaluate(node.left);
            }
            if (rightValue > this.MAX_MULTIPLY) {
                node.right = generateSubTree(depth - 1, false);
                rightValue = evaluate(node.right);
            }
        }
    }

    private Node generateSubTree(int depth, boolean firstInvocation) {

        // Force leafs to be a number between 1 and 9
        if (depth == 0) {
            return new Node(String.valueOf(generateNumber()));
        }

        // Choose between creating an operator or operand.
        if (!firstInvocation && random.nextBoolean()) {
            return new Node(String.valueOf(generateNumber()));
        } else {
            String op = generateOperator();
            Node node = new Node(op);

            node.left = generateSubTree(depth - 1, false);
            node.right = generateSubTree(depth - 1, false);

            if ("-".equals(op)) {
                handleSubtraction(node, depth);
            } else if ("/".equals(op)) {
                handleDivision(node, depth);
            } else if ("*".equals(op)) {
                handleMultiplication(node, depth);
            }

            return node;
        }
    }

    public String generateExpression(String difficulty) {

        this.difficulty = DifficultyMap.getProperties(difficulty);
        this.MAX_DEPTH = this.difficulty.getDepth();
        this.MAX_RANDOM = this.difficulty.getMaxRandom();
        this.MAX_MULTIPLY = this.difficulty.getMaxMultiply();
        this.IS_DIVISIBLE_BY_ONE = this.difficulty.isDivideByOne();

        this.root = generateSubTree(this.MAX_DEPTH, true);
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
        return errorCheck(node, leftValue, rightValue);
    }

    private double errorCheck(Node node, double leftValue, double rightValue) {
        switch (node.value) {
            case "+":
                return leftValue + rightValue;
            case "-":
                if (rightValue > leftValue) {
                    throw new ArithmeticException("Negative Result");
                }
                return leftValue - rightValue;
            case "*":
                if (leftValue > MAX_MULTIPLY || rightValue > MAX_MULTIPLY) {
                    throw new ArithmeticException("Multiplier operator too large");
                }
                return leftValue * rightValue;
            case "/":
                if (rightValue == 0) {
                    throw new ArithmeticException("Division by zero");
                }
                if (!IS_DIVISIBLE_BY_ONE && rightValue == 1) {
                    throw new ArithmeticException("Division by one");
                }
                return leftValue / rightValue;
            default:
                throw new IllegalArgumentException("Invalid operator: " + node.value);
        }
    }
}