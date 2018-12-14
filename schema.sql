CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL(10, 2),
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

-- CSV import deletes last item for me so this may or may not be needed to execute depending on if YOURsql works properly cause MYsql didnt
INSERT INTO products(product_name, department_name, price, stock_quantity)
values ("IWC Big Pilot", "Jewelry", 40000, 1);
