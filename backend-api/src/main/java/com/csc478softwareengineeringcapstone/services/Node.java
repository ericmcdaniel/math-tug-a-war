package com.csc478softwareengineeringcapstone.services;

public class Node {
    String value;
    Node left;
    Node right;

    Node(String value) {
        this.value = value;
    }

    public String getValue() {
        switch (value) {
            case "+":
            case "-":
                return value;
            case "*":
                return "\\times";
            case "/":
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
