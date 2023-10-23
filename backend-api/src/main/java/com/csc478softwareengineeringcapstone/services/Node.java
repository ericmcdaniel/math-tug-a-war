package com.csc478softwareengineeringcapstone.services;

public class Node {
    String value;
    Node left;
    Node right;

    Node(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    public Node getLeft() {
        return this.left;
    }

    public Node getRight() {
        return this.right;
    }
}
