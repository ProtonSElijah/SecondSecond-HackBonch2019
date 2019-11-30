package com.hackathon.aggregator;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
class Item {
	private @Id @GeneratedValue Long id;
	private String name, price, description, img, url;
	private int [] size;
	private String minSize, maxSize;
	
	Item() {}

	public Item(String name, String price, String description, String img, String url,
			String minSize, String maxSize) {
		super();
		this.name = name;
		this.price = price;
		this.description = description;
		this.img = img;
		this.url = url;
		this.minSize = minSize;
		this.maxSize = maxSize;
	}	
	
}
