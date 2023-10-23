package com.csc478softwareengineeringcapstone.services;

public class DifficultyProperties {
    private int depth;
    private int maxRandom;
    private int maxMultiply;
    private boolean divideByOne;

    public DifficultyProperties(int depth, int maxRandom, int maxMultiply, boolean divideByOne) {
        this.depth = depth;
        this.maxRandom = maxRandom;
        this.maxMultiply = maxMultiply;
        this.divideByOne = divideByOne;
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

    public boolean isDivideByOne() {
        return divideByOne;
    }
}
