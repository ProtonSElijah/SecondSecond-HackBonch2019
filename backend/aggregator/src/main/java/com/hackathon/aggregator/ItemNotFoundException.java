package com.hackathon.aggregator;

class ItemNotFoundException extends RuntimeException {
	ItemNotFoundException(Long id) {
		super("No item with the id " + id + " found");
	}
	ItemNotFoundException(String price) {
		super("No item with price " + price + " found");
	}
}
