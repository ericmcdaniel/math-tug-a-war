package com.csc478softwareengineeringcapstone;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.csc478softwareengineeringcapstone.services.DifficultyMap;
import com.csc478softwareengineeringcapstone.services.DifficultyProperties;

class DifficultyMapTest {

    @BeforeEach
    void setUp() {
    }

    @Test
    void testGetPropertiesEasy() {
        DifficultyProperties properties = DifficultyMap.getProperties("easy");
        assertNotNull(properties);
        assertEquals(2, properties.getDepth());
        assertEquals(9, properties.getMaxRandom());
        assertEquals(12, properties.getMaxMultiply());
        assertEquals(true, properties.isDivideByOne());
    }

    @Test
    void testGetPropertiesMedium() {
        DifficultyProperties properties = DifficultyMap.getProperties("medium");
        assertNotNull(properties);
        assertEquals(3, properties.getDepth());
        assertEquals(9, properties.getMaxRandom());
        assertEquals(12, properties.getMaxMultiply());
        assertEquals(false, properties.isDivideByOne());
    }

    @Test
    void testGetPropertiesHard() {
        DifficultyProperties properties = DifficultyMap.getProperties("hard");
        assertNotNull(properties);
        assertEquals(4, properties.getDepth());
        assertEquals(9, properties.getMaxRandom());
        assertEquals(12, properties.getMaxMultiply());
        assertEquals(false, properties.isDivideByOne());
    }

    @Test
    void testGetPropertiesUnknown() {
        DifficultyProperties properties = DifficultyMap.getProperties("unknown");
        assertNull(properties);
    }

    @Test
    void testGetPropertiesCaseInsensitive() {
        DifficultyProperties properties = DifficultyMap.getProperties("EaSY");
        assertNotNull(properties);
        assertEquals(2, properties.getDepth());
        assertEquals(9, properties.getMaxRandom());
        assertEquals(12, properties.getMaxMultiply());
        assertEquals(true, properties.isDivideByOne());
    }
}
