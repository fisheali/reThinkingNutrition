/*
Names: Calvin Todd and Alice Fischer
Class: CS 344
Assignment: Project 4

Section A: Data Definition Queries
*/

DROP TABLE IF EXISTS Supplements_Articles;
DROP TABLE IF EXISTS Conditions_Supplements;
DROP TABLE IF EXISTS Clients_Supplements;
DROP TABLE IF EXISTS Conditions_Articles;
DROP TABLE IF EXISTS Clients_Conditions;
DROP TABLE IF EXISTS Clients_Articles;
DROP TABLE IF EXISTS Consultations;
DROP TABLE IF EXISTS Articles;
DROP TABLE IF EXISTS Supplements;
DROP TABLE IF EXISTS Conditions;
DROP TABLE IF EXISTS Brands;
DROP TABLE IF EXISTS Clients;

CREATE TABLE Clients (
  `client_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(255) NOT NULL,
  `lname` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255),
  `city` VARCHAR(255)
);

CREATE TABLE Conditions (
  `condition_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `condition_name` VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Brands (
  `brand_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `brand_name` VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Articles (
  `article_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) UNIQUE NOT NULL,
  `publish_date` DATE,
  `publication` VARCHAR(255),
  `author` VARCHAR(255),
  `website` VARCHAR(255)
);

CREATE TABLE Consultations (
  `consultation_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `time` TIME,
  `completed` BOOLEAN NOT NULL DEFAULT "0",
  `paid` BOOLEAN NOT NULL DEFAULT "0",
  `note` MEDIUMTEXT,
  `client_id` INT
);

CREATE TABLE Clients_Articles (
  `date_recommended` DATE,
  `article_id` INT NOT NULL,
  `client_id` INT NOT NULL
);

CREATE TABLE Clients_Conditions (
  `client_id` INT NOT NULL,
  `condition_id` INT NOT NULL
);

CREATE TABLE Conditions_Articles (
  `condition_id` INT NOT NULL,
  `article_id` INT NOT NULL
);

CREATE TABLE Supplements (
  `supplement_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NOT NULL,
  `brand_id` INT
);

CREATE TABLE Clients_Supplements (
  `date_recommended` DATE,
  `client_id` INT NOT NULL,
  `supplement_id` INT NOT NULL
);

CREATE TABLE Conditions_Supplements (
  `condition_id` INT NOT NULL,
  `supplement_id` INT NOT NULL
);

CREATE TABLE Supplements_Articles (
  `supplement_id` INT NOT NULL,
  `article_id` INT NOT NULL
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

/*Part B: Sample Data*/

/*Create Entity Tables with Test Data*/
INSERT INTO Clients (fname, lname, phone, email, address, city) VALUES
('Calvin', 'Todd', '703-282-6899', 'toddcal@oregonstate.edu', '220 Evergreen Avenue', 'Imperial Beach'),
('Michelle', 'Gomez', '619-550-4200', 'MishSquish@BestGFEver.com', '220 Evergreen Avenue', 'Imperial Beach'),
('Jake', 'Peralta', '718-099-0099', 'NineNine@NYPD.com', '420 Nakatomi Plaza', 'New York'),
('Rockito', 'Gomez', '619-789-9874', 'AVeryGoodBoy@BestDoggitos.com', '220 Evergreen Avenue', 'Tijuana'),
('Queso', 'Todd', '456-123-1324', 'BigChonkers@AlwaysHungry.org', '220 Evergreen Avenue', 'Imperial Beach'),
('Bilbo', 'Baggins', '888-879-8888', 'LeadRingAppraiser@BagEnd.com', '2315 Bag End', 'Shire');

INSERT INTO Conditions (condition_name) VALUES
('High Blood Pressure'),
('Non-Alcoholic Fatty Liver'),
('Gut Health'),
('Heart Disease'),
('Weight Loss'),
('Low Energy'),
('Diabetes');

INSERT INTO Brands (brand_name) VALUES
('Nature\'s Choice'),
('Miracle Pills'),
('Flintstone Vitamin Company'),
('Rockin Rocko\'s'),
('Generic');

INSERT INTO Articles (title, publish_date, publication, author, website) VALUES
('Fixing Your Tum Tum', '2021-04-20', 'Doctor Things Weekly', 'Dr. Doktor', 'www.DoctorStuff.com'),
('Hearty Heart Health', '2021-05-15', '', 'Henry Cavill', 'www.WitcherTips.com'),
('How Cat\s Can Cure Diabetes', '2021-01-01', '', 'Queso My Cat', 'www.DrKitty.com'),
('Rockin Rocko\'s Miracle Magnesium Poisons Entire City', '2021-01-21', 'News and Stuff', 'Miley Cyrus Probably', ''),
('Bear Attacks and Low Energy, a New Study', '2021-08-01', 'Bear With Me Weekly', 'Not A Bear', 'www.ThingsNotWrittenByBears.com'),
('Miracle Pills Milkthistle Fixed My Liver', '2021-02-20', '', 'Moe', 'www.MoesTavern.com'),
('Bear Attacks and Weight Loss, Another New Study', 'Bear With Me Weekly', '456-123-1324', 'Also Not A Bear', 'www.ThingsNotWrittenByBears.com'),
('OSU CS 344 Linked to Increase in High Blood Pressure', 'Beaver News', '456-123-1324', 'Calvin Todd', 'os1.oregonstate.edu'),
('Generic Vitamin D, AKA Sunshine', '2021-10-10', '', 'Brett Farve', 'www.UnimportantPeopleImportantThings.edu'),
('How Dinosaurs Dealt with Gut Health', '2021-03-23', '', 'Ross Chandler', 'www.MyGirlfriendKeepsTryingToGetMeToWatchFriendsButIFindTHeCharactersSoAnnoying.com'),
('Weight Loss Dance Party Track List', '2021-04-20', 'Dance Party Quarterly', 'Shakira Shakira', 'www.HipsDontLie.org'),
('Best Supplements for Low Energy', '2021-06-30', '', 'The Shamwow Guy', 'www.redbullllll.com'),
('Margarita Recipes for Non-Alcoholic Fatty Liver', '2021-09-20', 'Party People Magazine', 'Robert Downy Jr Sr', ''),
('Heart Disease and Water Polo', '2021-04-19', 'Esquire But Fancier', 'Sir Kensington', 'www.SoFancyYo.com'),
('Magic Brian\'s Weight Loss Tips', '2006-05-03', '', 'Griffin Macelroy', 'www.TAZ.com');

INSERT INTO Consultations (date, time, completed, paid, note, client_id) VALUES
('2021-05-03', '12:30', 1, 0, 'Saw Calvin in regards to his Gut Health.  I reccomended him stop eating Rally\'s Spicy Chicken Sandwhiches at 2AM.  He Responded "NEVER" and ran out of the room, presumably to go back to Rally\'s', (SELECT client_id FROM Clients WHERE fname = 'Calvin')),
('2021-01-30', '12:30', 1, 1, 'Michelle is genuinely one of the best people I have ever seen.  She is healthy and beautiful, and outside a strange obsession with Friends perfect.  No reccomendations made.', (SELECT client_id FROM Clients WHERE fname = 'Michelle')),
('2021-05-04', '12:30', 1, 0, 'Saw Calvin again this time about his blood pressure.  He blamed it on something called CS344, but I reminded him that fast food like Rally\'s Spicy Chicken Sandwhiches can cuase High Blood Pressure as Well.  He started Crying.', (SELECT client_id FROM Clients WHERE fname = 'Calvin')),
('2022-03-09', '12:30', 0, 0, '', (SELECT client_id FROM Clients WHERE fname = 'Rockito')),
('2023-05-03', '12:30', 0, 0, '', (SELECT client_id FROM Clients WHERE fname = 'Queso'));

INSERT INTO Supplements (type, brand_id) VALUES
('Milkthistle', (SELECT brand_id FROM Brands WHERE brand_name = 'Rockin Rocko\'s')),
('Magnesium', (SELECT brand_id FROM Brands WHERE brand_name = 'Rockin Rocko\'s')),
('Cats Whiskers', (SELECT brand_id FROM Brands WHERE brand_name = 'Rockin Rocko\'s')),
('Vitamin C', (SELECT client_id FROM Clients WHERE fname = 'Generic')),
('Iron', (SELECT client_id FROM Clients WHERE fname = 'Generic')),
('Valarian Root', (SELECT client_id FROM Clients WHERE fname = 'Miracle Pills')),
('Eye of Newt', (SELECT client_id FROM Clients WHERE fname = 'Miracle Pills')),
('Vitamin D', (SELECT client_id FROM Clients WHERE fname = 'Flintstone Vitamin Company')),
('Multi(pass) Vitamin', (SELECT brand_id FROM Brands WHERE brand_name = 'Nature\'s Choice')),
('Calcium', (SELECT brand_id FROM Brands WHERE brand_name = 'Nature\'s Choice')),
('Fiber', (SELECT client_id FROM Clients WHERE fname = 'Flintstone Vitamin Company')),
('Vitamin B', (SELECT client_id FROM Clients WHERE fname = 'Generic'));

/*Intersection Tables with Test Data*/

INSERT INTO Clients_Articles (date_recommended, article_id, client_id) VALUES
('2021-05-03', (SELECT article_id FROM Articles WHERE title = 'Bear Attacks and Low Energy, a New Study'), (SELECT client_id FROM Clients WHERE fname = 'Calvin')),
('2021-01-30', (SELECT article_id FROM Articles WHERE title = 'How Cat\s Can Cure Diabetes'),(SELECT client_id FROM Clients WHERE fname = 'Michelle')),
('2021-05-04', (SELECT article_id FROM Articles WHERE title = 'Bear Attacks and Weight Loss, Another New Study'),(SELECT client_id FROM Clients WHERE fname = 'Calvin')),
('2022-03-09', (SELECT article_id FROM Articles WHERE title = 'How Dinosaurs Dealt with Gut Health'),(SELECT client_id FROM Clients WHERE fname = 'Rockito')),
('2023-05-03', (SELECT article_id FROM Articles WHERE title = 'Magic Brian\'s Weight Loss Tips'),(SELECT client_id FROM Clients WHERE fname = 'Queso'));

INSERT INTO Clients_Conditions (client_id, condition_id) VALUES
((SELECT client_id FROM Clients WHERE fname = 'Calvin'), (SELECT condition_id FROM Conditions WHERE condition_name = 'High Blood Pressure')),
((SELECT client_id FROM Clients WHERE fname = 'Michelle'), (SELECT condition_id FROM Conditions WHERE condition_name = 'Low Energy')),
((SELECT client_id FROM Clients WHERE fname = 'Calvin'), (SELECT condition_id FROM Conditions WHERE condition_name = 'Low Energy')),
((SELECT client_id FROM Clients WHERE fname = 'Rockito'), (SELECT condition_id FROM Conditions WHERE condition_name = 'Gut Health')),
((SELECT client_id FROM Clients WHERE fname = 'Queso'), (SELECT condition_id FROM Conditions WHERE condition_name = 'Non-Alcoholic Fatty Liver'));

INSERT INTO Conditions_Articles (condition_id, article_id) VALUES
((SELECT condition_id FROM Conditions WHERE condition_name = 'High Blood Pressure'), (SELECT article_id FROM Articles WHERE title = 'Bear Attacks and Low Energy, a New Study')),
((SELECT condition_id FROM Conditions WHERE condition_name = 'Non-Alcoholic Fatty Liver'),(SELECT article_id FROM Articles WHERE title = 'Margarita Recipes for Non-Alcoholic Fatty Liver')),
((SELECT condition_id FROM Conditions WHERE condition_name = 'Low Energy'),(SELECT article_id FROM Articles WHERE title = 'Best Supplements for Low Energy')),
((SELECT condition_id FROM Conditions WHERE condition_name = 'Gut Health'),(SELECT article_id FROM Articles WHERE title = 'How Dinosaurs Dealt with Gut Health')),
((SELECT condition_id FROM Conditions WHERE condition_name = 'Non-Alcoholic Fatty Liver'),(SELECT article_id FROM Articles WHERE title = 'Miracle Pills Milkthistle Fixed My Liver'));

INSERT INTO Clients_Supplements (date_recommended, supplement_id, client_id) VALUES
('2021-05-03', (SELECT supplement_id FROM Supplements WHERE type = 'Multi(pass) Vitamin'), (SELECT client_id FROM Clients WHERE fname = 'Calvin')),
('2021-01-30', (SELECT supplement_id FROM Supplements WHERE type = 'Magnesium'),(SELECT client_id FROM Clients WHERE fname = 'Michelle')),
('2021-05-04', (SELECT supplement_id FROM Supplements WHERE type = 'Fiber'),(SELECT client_id FROM Clients WHERE fname = 'Calvin')),
('2022-03-09', (SELECT supplement_id FROM Supplements WHERE type = 'Eye of Newt'),(SELECT client_id FROM Clients WHERE fname = 'Rockito')),
('2023-05-03', (SELECT supplement_id FROM Supplements WHERE type = 'Magnesium'),(SELECT client_id FROM Clients WHERE fname = 'Queso'));

INSERT INTO Conditions_Supplements (condition_id, supplement_id) values
((SELECT condition_id FROM Conditions WHERE condition_name = 'High Blood Pressure'), (SELECT supplement_id FROM Supplements WHERE type = 'Magnesium')),
((SELECT condition_id FROM Conditions WHERE condition_name = 'Non-Alcoholic Fatty Liver'),(SELECT supplement_id FROM Supplements WHERE type = 'Magnesium')),
((SELECT condition_id FROM Conditions WHERE condition_name = 'Low Energy'),(SELECT supplement_id FROM Supplements WHERE type = 'Multi(pass) Vitamin')),
((SELECT condition_id FROM Conditions WHERE condition_name = 'Gut Health'),(SELECT supplement_id FROM Supplements WHERE type = 'Fiber')),
((SELECT condition_id FROM Conditions WHERE condition_name = 'Non-Alcoholic Fatty Liver'),(SELECT supplement_id FROM Supplements WHERE type = 'Eye of Newt'));

INSERT INTO Supplements_Articles (supplement_id, article_id) VALUES
((SELECT supplement_id FROM Supplements WHERE type = 'Multi(pass) Vitamin'), (SELECT article_id FROM Articles WHERE title = 'Bear Attacks and Low Energy, a New Study')),
((SELECT supplement_id FROM Supplements WHERE type = 'Magnesium'), (SELECT article_id FROM Articles WHERE title = 'Rockin Rocko\'s Miracle Magnesium Poisons Entire City')),
((SELECT supplement_id FROM Supplements WHERE type = 'Fiber'), (SELECT article_id FROM Articles WHERE title = 'How Dinosaurs Dealt with Gut Health')),
((SELECT supplement_id FROM Supplements WHERE type = 'Eye of Newt'), (SELECT article_id FROM Articles WHERE title = 'Margarita Recipes for Non-Alcoholic Fatty Liver')),
((SELECT supplement_id FROM Supplements WHERE type = 'Milkthistle'), (SELECT article_id FROM Articles WHERE title = 'Miracle Pills Milkthistle Fixed My Liver'));
