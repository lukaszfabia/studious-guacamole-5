package com.lukaszfabia.main.dto;

import com.lukaszfabia.main.model.Product;

public record ProductDTO(
        Long id,
        String name,
        Double weight,
        Double price,
        String category) {

    public ProductDTO(String name, String category) {
        this(0L, name, 0.0, 0.0, category);
    }

    public ProductDTO(int id, String name, Double weight,
            Double price, String category) {
        this(Long.valueOf(id), name, weight, price, category);
    }

    public ProductDTO() {
        this(0L, "", 0.0, 0.0, "");
    }

    public ProductDTO(Product product) {
        this(product.getId(), product.getName(), product.getWeight(), product.getPrice(),
                product.getCategory());
    }

}
