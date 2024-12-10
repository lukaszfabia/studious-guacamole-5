--liquibase formatted sql
--changeset igor:1-create-products-table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  price NUMERIC(10, 2),
  weight NUMERIC(10, 2)
);