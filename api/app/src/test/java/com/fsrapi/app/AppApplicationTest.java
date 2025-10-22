package com.fsrapi.app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = AppApplication.class)
@TestPropertySource(locations = "classpath:application-test.properties")
class AppApplicationTest {

	@Test
	void contextLoads() {
	}

}
