package com.csc478softwareengineeringcapstone;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.jayway.jsonpath.JsonPath;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class MathExpressionControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void testGenerateEquationDefault() throws Exception {
    mockMvc.perform(get("/generate-equation"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.equation").exists());
  }

  @Test
  void testValidateAnswerCorrect() throws Exception {
    MvcResult mvcResult = mockMvc.perform(get("/generate-equation"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.equation").exists())
        .andReturn();

    String equationID = JsonPath.read(mvcResult.getResponse().getContentAsString(), "$.id");

    //Gotta figure out how to get the answer or seed this to always create the same equation same each time. 
    //I know we somewhat did this for the other test originally.
    double correctAnswer = 0.0;

    mockMvc.perform(post("/validate-answer")
        .contentType("application/json")
        .content("{\"id\":\"" + equationID + "\",\"answer\":\"" + correctAnswer + "\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("incorrect"));
  }

}
