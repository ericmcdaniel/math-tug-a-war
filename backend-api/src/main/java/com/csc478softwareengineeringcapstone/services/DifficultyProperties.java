package com.csc478softwareengineeringcapstone.services;

public class DifficultyProperties {
    private int depth;
    private int maxRandom;
    private int maxMultiply;
    private boolean divisibleByOne;

    public DifficultyProperties(int depth, int maxRandom, int maxMultiply, boolean divisibleByOne) {
        this.depth = depth;
        this.maxRandom = maxRandom;
        this.maxMultiply = maxMultiply;
        this.divisibleByOne = divisibleByOne;
    }

    public int getDepth() {
        return depth;
    }

    public int getMaxRandom() {
        return maxRandom;
    }

    public int getMaxMultiply() {
        return maxMultiply;
    }

    public boolean isDivisibleByOne() {
        return divisibleByOne;
    }
}
