/* Though you will use a relational database, your database need not have multiple tables. */
/* This will be my database to implement. */
-- Remove any existing database and user.
DROP DATABASE IF EXISTS petstore;
DROP USER IF EXISTS petstore_user@localhost;

-- Create Unforget database and user. Ensure Unicode is fully supported.
CREATE DATABASE petstore CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER petstore_user@localhost IDENTIFIED WITH mysql_native_password BY 'petstore';
GRANT ALL PRIVILEGES ON petstore.* TO petstore_user@localhost;

use petstore;
DROP TABLE IF EXISTS Pet;


CREATE TABLE Pet (
	PRIMARY KEY (PetID),
    species VARCHAR(20),
    pet_name, VARCHAR(20),
    isCut, BIT,
	pet_color, VARCHAR(20),
	adoption_fee, INT,
	isAvailable BIT
);

CREATE TABLE Customer (
	PRIMARY KEY (CustID),
	fname  VARCHAR(30),
	lname  VARCHAR(40),
	cus_address  VARCHAR(100),
	phone_num int,
	email  VARCHAR(100),
	balance int
);

INSERT INTO Pet(PetID, species, pet_name, isCut, pet_color, adoption_fee, isAvailable)

VALUES
(1, "Dog", "Johnny", 1, "golden", 199, 1),
(2, "Dog", "Beethoven", 1, "brown-black", 259, 1),
(3, "Dog", "Hoover", 1, "white", 189, 1),
(3, "Cat", "sparkles", 1, "white", 1999, 0), -- Dwight killed her
(4, "Dog", "Mutt", 1, "gray", 129, 1);

-- INSERT INTO Customer(PetID, SPECIES, PET_NAME, isCut, PET_COLOR, ADOPTION_FEE, isAvailable)

-- VALUES
-- (1, "Dog", "Johnny", 1, "golden", 199, 1),
-- (2, "Dog", "Beethoven", 1, "brown-black", 259, 1),
-- (3, "Dog", "Hoover", 1, "white", 189, 1),
-- (4, "Dog", "Mutt", 1, "gray", 129, 1);


-- SELECT * FROM Pets.cats WHERE isAvailable = 1;
-- Could also do.. SELECT * FROM Pets WHERE isAvailable = 1 AND SPECIES = "Cat";



/* edit this stub code and add tables for Pet and Customer */
