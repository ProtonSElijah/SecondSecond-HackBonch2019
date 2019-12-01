package com.hackathon.aggregator;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;




@Configuration
public class LoadDatabase {

	@Bean
	CommandLineRunner initDatabase(ItemRepository repository) {
		return args -> {
			repository.save(new Item("Test", "300", "Отсоси у тракториста)))))", "https://www.meme-arsenal.com/memes/876041c5669352bb985e3a11eda018b7.jpg", "https://www.example.com", "XXS", "XS"));
			repository.save(new Item("Big Dick", "2000", "Отсоси у тракториста)))))", "https://www.meme-arsenal.com/memes/876041c5669352bb985e3a11eda018b7.jpg", "https://www.example.com", "M", "L"));
			};
	}
}
