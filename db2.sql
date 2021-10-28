-- Remove any existing database and user.
DROP DATABASE IF EXISTS foodcheck;
DROP USER IF EXISTS foodcheck_user@localhost;

-- Create Unforget database and user. Ensure Unicode is fully supported.
CREATE DATABASE foodcheck CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER foodcheck_user@localhost IDENTIFIED WITH mysql_native_password BY 'foodcheck';
GRANT ALL PRIVILEGES ON foodcheck.* TO foodcheck_user@localhost;

use foodcheck;
DROP TABLE IF EXISTS food;

CREATE TABLE food (
  Food_ID SMALLINT NOT NULL,
  FoodItem TINYTEXT NOT NULL,
  Calories SMALLINT NOT NULL,
  TimeEaten DATETIME NOT NULL,
  PRIMARY KEY (Food_ID)
);

INSERT INTO food(Food_ID, FoodItem, Calories, TimeEaten)
VALUES (1, "fries", 280, "2000-10-10T10:58:59");
INSERT INTO food(Food_ID, FoodItem, Calories, TimeEaten)
VALUES (2, "chips", 200, "2000-10-10T15:11:32");
INSERT INTO food(Food_ID, FoodItem, Calories, TimeEaten)
VALUES (3, "pizza", 450, "2000-10-11T09:17:30");
INSERT INTO food(Food_ID, FoodItem, Calories, TimeEaten)
VALUES (4, "tacos", 200, "2000-10-12T13:40:10");