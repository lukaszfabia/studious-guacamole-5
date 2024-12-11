package com.lukaszfabia.main.model;

import com.lukaszfabia.main.dto.ProductDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    // TODO: change it on category table
    @Column(name = "category")
    private String category;

    @Column(name = "weight")
    private BigDecimal weight;

    @Column(name = "price")
    private BigDecimal price;

    public Product(ProductDTO productDTO) {
        this.name = productDTO.name();
        this.category = productDTO.category();
        this.price = BigDecimal.valueOf(productDTO.price());
        this.weight = BigDecimal.valueOf(productDTO.weight());
    }

    public Product() {
        this(new ProductDTO());
    }

    // MARK: getters

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getCategory() {
        return this.category;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public BigDecimal getWeight() {
        return this.weight;
    }

    // MARK: setters

    public void setName(String name) throws Exception {
        if (name.isEmpty()) {
            throw new Exception("Name is empty!");
        } else {
            this.name = name;
        }
    }

    public void setCategory(String category) throws Exception {
        if (category.isEmpty()) {
            throw new Exception("Category is empty!");
        } else {
            this.category = category;
        }
    }

    public void setPrice(BigDecimal price) throws Exception {
        if (price.floatValue() < 0) {
            throw new Exception("Price can't be negative!");
        } else {
            this.price = price;
        }
    }

    public void setWeight(BigDecimal weight) throws Exception {
        if (weight.floatValue() < 0) {
            throw new Exception("Weight can't be negative!");
        } else {
            this.weight = weight;
        }
    }
}
