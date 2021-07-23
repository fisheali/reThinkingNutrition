/*
Names: Calvin Todd and Alice Fischer
Class: CS 340
Assignment: Project 4
*/

--Section A: Data Definition Queries

DROP TABLE IF EXISTS Clients;
CREATE TABLE Clients (
  `client_id` INT UNIQUE PRIMARY KEY NOT NULL,
  `fname` VARCHAR(25) NOT NULL,
  `lname` VARCHAR(25) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `address` VARCHAR(50),
  `city` VARCHAR(25)
);

DROP TABLE IF EXISTS Conditions;
CREATE TABLE Conditions (
  `condition_id` INT UNIQUE PRIMARY KEY NOT NULL,
  `condition_name` VARCHAR(50) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS Brands;
CREATE TABLE Brands (
  `brand_id` INT UNIQUE PRIMARY KEY NOT NULL,
  `brand_name` VARCHAR(50) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS Articles;
CREATE TABLE Articles (
  `article_id` INT UNIQUE PRIMARY KEY NOT NULL,
  `title` VARCHAR(50) UNIQUE NOT NULL,
  `publish_date` DATE,
  `publication` VARCHAR(50),
  `author` VARCHAR(50),
  `website` VARCHAR(50)
);

DROP TABLE IF EXISTS Consultations;
CREATE TABLE Consultations (
  `consultation_id` INT UNIQUE PRIMARY KEY NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME,
  `completed` BOOLEAN NOT NULL DEFAULT "0",
  `paid` BOOLEAN NOT NULL DEFAULT "0",
  `note` MEDIUMTEXT,
  `client_id` INT
);

DROP TABLE IF EXISTS Clients_Articles;
CREATE TABLE Clients_Articles (
  `date_recommended` DATE,
  `article_id` INT NOT NULL,
  `client_id` INT NOT NULL,
  PRIMARY KEY (`article_id`, `client_id`)
);

DROP TABLE IF EXISTS Clients_Conditions;
CREATE TABLE Clients_Conditions (
  `client_id` INT NOT NULL,
  `condition_id` INT NOT NULL,
  PRIMARY KEY (`client_id`, `condition_id`)
);

DROP TABLE IF EXISTS Conditions_Articles;
CREATE TABLE Conditions_Articles (
  `condition_id` INT NOT NULL,
  `article_id` INT NOT NULL,
  PRIMARY KEY (`condition_id`, `article_id`)
);

DROP TABLE IF EXISTS Supplements;
CREATE TABLE Supplements (
  `supplement_id` INT UNIQUE PRIMARY KEY NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `brand_id` INT
);

DROP TABLE IF EXISTS Clients_Supplements;
CREATE TABLE Clients_Supplements (
  `date_recommended` DATE,
  `client_id` INT NOT NULL,
  `supplement_id` INT NOT NULL,
  PRIMARY KEY (`client_id`, `supplement_id`)
);

DROP TABLE IF EXISTS Conditions_Supplements;
CREATE TABLE Conditions_Supplements (
  `condition_id` INT NOT NULL,
  `supplement_id` INT NOT NULL,
  PRIMARY KEY (`condition_id`, `supplement_id`)
);

DROP TABLE IF EXISTS Supplements_Stores;
CREATE TABLE Supplements_Stores (
  `price` FLOAT,
  `store_id` INT NOT NULL,
  `supplement_id` INT NOT NULL,
  PRIMARY KEY (`store_id`, `supplement_id`)
);

DROP TABLE IF EXISTS Supplements_Articles;
CREATE TABLE Supplements_Articles (
  `supplement_id` INT NOT NULL,
  `article_id` INT NOT NULL,
  PRIMARY KEY (`supplement_id`, `article_id`)
);

ALTER TABLE Consultations ADD FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE CASCADE;

ALTER TABLE Clients_Articles ADD FOREIGN KEY (`article_id`) REFERENCES `Articles` (`article_id`) ON DELETE CASCADE;

ALTER TABLE Clients_Articles ADD FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE CASCADE;

ALTER TABLE Clients_Conditions ADD FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE CASCADE;

ALTER TABLE Clients_Conditions ADD FOREIGN KEY (`condition_id`) REFERENCES `Conditions` (`condition_id`) ON DELETE CASCADE;

ALTER TABLE Conditions_Articles ADD FOREIGN KEY (`condition_id`) REFERENCES `Conditions` (`condition_id`) ON DELETE CASCADE;

ALTER TABLE Conditions_Articles ADD FOREIGN KEY (`article_id`) REFERENCES `Articles` (`article_id`) ON DELETE CASCADE;

ALTER TABLE Supplements ADD FOREIGN KEY (`brand_id`) REFERENCES `Brands` (`brand_id`) ON DELETE CASCADE;

ALTER TABLE Clients_Supplements ADD FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE CASCADE;

ALTER TABLE Clients_Supplements ADD FOREIGN KEY (`supplement_id`) REFERENCES `Supplements` (`supplement_id`) ON DELETE CASCADE;

ALTER TABLE Conditions_Supplements ADD FOREIGN KEY (`condition_id`) REFERENCES `Conditions` (`condition_id`) ON DELETE CASCADE;

ALTER TABLE Conditions_Supplements ADD FOREIGN KEY (`supplement_id`) REFERENCES `Supplements` (`supplement_id`) ON DELETE CASCADE;

ALTER TABLE Supplements_Articles ADD FOREIGN KEY (`supplement_id`) REFERENCES `Supplements` (`supplement_id`) ON DELETE CASCADE;

ALTER TABLE Supplements_Articles ADD FOREIGN KEY (`article_id`) REFERENCES `Articles` (`article_id`) ON DELETE CASCADE;
