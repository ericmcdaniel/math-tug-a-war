package com.csc478softwareengineeringcapstone.services;

import org.springframework.stereotype.Service;

@Service
public class ExpressionTreeService {
    private Node root;
    private String[] operators = { "+", "-", "*", "/" };
    private String[] leftParenthesis = { "(", "\\big(", "\\Big(", "\\bigg(", "\\Bigg(", "\\Biggr(" };
    private String[] rightParenthesis = { ")", "\\big)", "\\Big)", "\\bigg)", "\\Bigg)", "\\Biggr)" };
    private RandomInt random;
    private DifficultyProperties difficulty;

    private int maxDepth;
    private int maxRandom;
    private int maxMultiply;
    private boolean isDivisiblyByOne;

    public ExpressionTreeService(RandomInt random) {
        this.random = random;
        this.root = null;
    }

    public Node getRoot() {
        return this.root;
    }

    private int generateNumber() {
        return random.nextInt(this.maxRandom) + 1;
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
                || (!this.isDivisiblyByOne && rightValue == 1)) {

            if (leftValue == 1 && !this.isDivisiblyByOne && rightValue == 1) {
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
        while (leftValue > this.maxMultiply || rightValue > this.maxMultiply) {
            if (leftValue > this.maxMultiply) {
                node.left = generateSubTree(depth - 1, false);
                leftValue = evaluate(node.left);
            }
            if (rightValue > this.maxMultiply) {
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
        if (!firstInvocation && depth <= 2 && random.nextBoolean()) {
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
        this.maxDepth = this.difficulty.getDepth();
        this.maxRandom = this.difficulty.getMaxRandom();
        this.maxMultiply = this.difficulty.getMaxMultiply();
        this.isDivisiblyByOne = this.difficulty.isDivideByOne();

        this.root = generateSubTree(this.maxDepth, true);
        int actualHeight = getTreeHeight(this.root);
        return inOrderTraversal(this.root, actualHeight);
    }

    private int getTreeHeight(Node node) {
        if (node == null)
            return 0;
        return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
    }

    private String inOrderTraversal(Node node, int depth) {
        if (node == null) {
            return "";
        }

        String left = inOrderTraversal(node.left, depth - 1);
        String right = inOrderTraversal(node.right, depth - 1);

        // Writing out the expression
        if (node.left != null && node.right != null) {
            return leftParenthesis[depth - 1]
                    + left + " " + node.getValue() + " " + right
                    + rightParenthesis[depth - 1];
        } else {
            return node.getValue();
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
                if (leftValue > maxMultiply || rightValue > maxMultiply) {
                    throw new ArithmeticException("Multiplier operator too large");
                }
                return leftValue * rightValue;
            case "/":
                if (rightValue == 0) {
                    throw new ArithmeticException("Division by zero");
                }
                if (!isDivisiblyByOne && rightValue == 1) {
                    throw new ArithmeticException("Division by one");
                }
                return leftValue / rightValue;
            default:
                throw new IllegalArgumentException("Invalid operator: " + node.value);
        }
    }
}