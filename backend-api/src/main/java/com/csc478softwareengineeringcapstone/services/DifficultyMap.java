package com.csc478softwareengineeringcapstone.services;

import java.util.HashMap;
import java.util.Map;

public class DifficultyMap {
    private static final Map<String, DifficultyProperties> map = new HashMap<>();

    static {
        map.put("easy", new DifficultyProperties(2, 9, 12, true));
        map.put("medium", new DifficultyProperties(3, 9, 12, false));
        map.put("hard", new DifficultyProperties(4, 9, 12, false));
    }

    public static DifficultyProperties getProperties(String difficulty) {
        return map.get(difficulty.toLowerCase());
    }
}
