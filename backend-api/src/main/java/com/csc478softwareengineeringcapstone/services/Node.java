package com.csc478softwareengineeringcapstone.services;

public class Node {
    public static final String ADD = "+";
    public static final String SUBTRACT = "-";
    public static final String MULTIPLY = "*";
    public static final String DIVIDE = "/";
    public static final String[] OPERATORS = { ADD, SUBTRACT, MULTIPLY, DIVIDE };

    public String value;
    public Node left;
    public Node right;

    public Node(String value) {
        this.value = value;
    }

    public String getValue() {
        switch (value) {
            case ADD:
            case SUBTRACT:
                return value;
            case MULTIPLY:
                return "\\times";
            case DIVIDE:
                return "\\div";
            default:
                return value;
        }
    }

    public Node getLeft() {
        return this.left;
    }

    public Node getRight() {
        return this.right;
    }
}
