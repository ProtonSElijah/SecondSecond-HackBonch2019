package com.hackathon.aggregator;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
class ItemController {
	private final ItemRepository repository;
	
	ItemController (ItemRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/items")
	List<Item> all(@RequestParam(required = false) String price, @RequestParam(required = false) String size, @RequestParam(required = false) String name) {
		if (price != null) {
			return repository.findByPrice(price);
		} else if (size != null) {
			return repository.findBySize(size);
		} else if (name != null) {
			return repository.findByName(name);
		} else {
			return repository.findAll();
		}
	}
		
	@PostMapping(value = "/items")
	Item newItem(@RequestBody Item newItem) {
		if (newItem.getSize()!=null) {
			newItem.setMinSize(SizeHelper.toSize(newItem.getSize())[0]);
		    newItem.setMaxSize(SizeHelper.toSize(newItem.getSize())[1]);
		}
		return repository.save(newItem);
	  }
	
	 @GetMapping("/items/priceRange")
	  List<Item> priceRange(@RequestParam Map<String,String> requestParams) {
		 String min = requestParams.get("min_price");
		 String max = requestParams.get("max_price");
		 return repository.priceRange(min, max);
	  }

	  /*@GetMapping("/items/{id}")
	  Item one(@PathVariable Long id) {
	    return repository.findById(id)
	      .orElseThrow(() -> new ItemNotFoundException(id));
	  }*/
	  
	 

	  /*@PutMapping("/items/{id}")
	  Item replaceItem(@RequestBody Item newItem, @PathVariable Long id) {

	    return repository.findById(id)
	      .map(item -> {
	        item.setName(newItem.getName());
	        item.setPrice(newItem.getPrice());
	        item.setDescription(newItem.getDescription());
	        item.setImg(newItem.getImg());
	        item.setSize(newItem.getSize());
	        return repository.save(item);
	      })
	      .orElseGet(() -> {
	        newItem.setId(id);
	        return repository.save(newItem);
	      });
	  }*/

	  /*@DeleteMapping("/items/{id}")
	  void deleteItem(@PathVariable Long id) {
	    repository.deleteById(id);
	  }*/	
}
