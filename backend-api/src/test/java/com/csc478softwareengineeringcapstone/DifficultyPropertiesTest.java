package com.csc478softwareengineeringcapstone;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.csc478softwareengineeringcapstone.services.DifficultyProperties;

class DifficultyPropertiesTest {

    private DifficultyProperties difficultyProperties;

    @BeforeEach
    void setUp() {
        difficultyProperties = new DifficultyProperties(2, 10, 5, true);
    }

    @Test
    void testConstructor() {
        assertNotNull(difficultyProperties);
    }

    @Test
    void testGetDepth() {
        assertEquals(2, difficultyProperties.getDepth());
    }

    @Test
    void testGetMaxRandom() {
        assertEquals(10, difficultyProperties.getMaxRandom());
    }

    @Test
    void testGetMaxMultiply() {
        assertEquals(5, difficultyProperties.getMaxMultiply());
    }

    @Test
    void testIsDivideByOne() {
        assertTrue(difficultyProperties.isDivisibleByOne());
    }
}
