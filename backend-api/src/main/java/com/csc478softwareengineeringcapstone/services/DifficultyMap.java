package com.csc478softwareengineeringcapstone.services;

import java.util.HashMap;
import java.util.Map;

public class DifficultyMap {
    private static final Map<String, DifficultyProperties> map = new HashMap<>();

    static {
        map.put("easy", new DifficultyProperties(2, 9, 12, true));
        map.put("medium", new DifficultyProperties(3, 20, 15, false));
        map.put("hard", new DifficultyProperties(3, 100, 20, false));
    }

    public static DifficultyProperties getProperties(String difficulty) {
        return map.get(difficulty.toLowerCase());
    }
}
