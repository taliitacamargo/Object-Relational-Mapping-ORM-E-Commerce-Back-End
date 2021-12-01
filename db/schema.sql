-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE category (
    id INT AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE product (
    id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL NOT NULL DECIMAL(true),
    stock INT NOT NULL NUMBER VALUE(10),
    category_id INT REFERENCES category(id),
    PRIMARY KEY (id)
);
CREATE TABLE tag (
    id INT AUTO_INCREMENT NOT NULL,
    tag_name VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE producttag (
    id INT AUTO_INCREMENT NOT NULL,
    product_id INT REFERENCES product(id),
    tag_id INT REFERENCES tag(id)
);

