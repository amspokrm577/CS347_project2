/* Though you will use a relational database, your database need not have multiple tables. */
/* This will be my database to implement. */
-- Remove any existing database and user.
DROP DATABASE IF EXISTS foodcheck;
DROP USER IF EXISTS foodcheck_user@localhost;

-- Create Unforget database and user. Ensure Unicode is fully supported.
CREATE DATABASE foodcheck CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER foodcheck_user@localhost IDENTIFIED WITH mysql_native_password BY 'foodcheck';
GRANT ALL PRIVILEGES ON foodcheck.* TO foodcheck_user@localhost;

/* edit this stub code and add tables for Pet and Customer */