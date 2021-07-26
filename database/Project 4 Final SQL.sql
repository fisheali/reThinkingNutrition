-- phpMyAdmin SQL Dump
-- version 5.1.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 25, 2021 at 03:37 PM
-- Server version: 10.4.20-MariaDB-log
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_toddcal`
--

-- --------------------------------------------------------

--
-- Table structure for table `Articles`
--

CREATE TABLE `Articles` (
  `article_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `publish_date` date DEFAULT NULL,
  `publication` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Articles`
--

INSERT INTO `Articles` (`article_id`, `title`, `publish_date`, `publication`, `author`, `website`) VALUES
(1, 'Fixing Your Tum Tum', '2021-04-20', 'Doctor Things Weekly', 'Dr. Doktor', 'www.DoctorStuff.com'),
(2, 'Hearty Heart Health', '2021-05-15', NULL, 'Henry Cavill', 'www.WitcherTips.com'),
(3, 'How Cats Can Cure Diabetes', '2021-01-01', NULL, 'Queso My Cat', 'www.DrKitty.com'),
(4, 'Rockin Rocko\'s Miracle Magnesium Poisons Entire City', '2021-01-21', 'News and Stuff', 'Miley Cyrus Probably', NULL),
(5, 'Bear Attacks and Low Energy, a New Study', '2021-08-01', 'Bear With Me Weekly', 'Not A Bear', 'www.ThingsNotWrittenByBears.com'),
(6, 'Miracle Pills Milkthistle Fixed My Liver', '2021-02-20', NULL, 'Moe', 'www.MoesTavern.com'),
(7, 'Bear Attacks and Weight Loss, Another New Study', '2021-06-09', 'Bear With Me Weekly', 'Also Not A Bear', 'www.ThingsNotWrittenByBears.com'),
(8, 'OSU CS 344 Linked to Increase in High Blood Pressure', '2021-07-20', 'Beaver Bytes', 'Calvin Todd', 'os1.oregonstate.edu'),
(9, 'Generic Vitamin D, AKA Sunshine', '2021-10-10', NULL, 'Brett Farve', 'www.UnimportantPeopleImportantThings.edu'),
(10, 'How Dinosaurs Dealt with Gut Health', '2021-03-23', NULL, 'Ross Chandler', 'www.MyGirlfriendKeepsTryingToGetMeToWatchFriendsButIFindTHeCharactersSoAnnoying.com'),
(11, 'Weight Loss Dance Party Track List', '2021-04-20', 'Dance Party Quarterly', 'Shakira Shakira', 'www.HipsDontLie.org'),
(12, 'Best Supplements for Low Energy', '2021-06-30', NULL, 'The Shamwow Guy', 'www.redbullllll.com'),
(13, 'Margarita Recipes for Non-Alcoholic Fatty Liver', '2021-09-20', 'Party People Magazine', 'Robert Downy Jr Sr', NULL),
(14, 'Heart Disease and Water Polo', '2021-04-19', 'Esquire But Fancier', 'Sir Kensington', 'www.SoFancyYo.com'),
(15, 'Magic Brian\'s Weight Loss Tips', '2006-05-03', NULL, 'Griffin Macelroy', 'www.TAZ.com');

-- --------------------------------------------------------

--
-- Table structure for table `Brands`
--

CREATE TABLE `Brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Brands`
--

INSERT INTO `Brands` (`brand_id`, `brand_name`) VALUES
(3, 'Flintstone Vitamin Company'),
(5, 'Generic'),
(2, 'Miracle Pills'),
(1, 'Nature\'s Choice'),
(4, 'Rockin Rocko\'s');

-- --------------------------------------------------------

--
-- Table structure for table `Clients`
--

CREATE TABLE `Clients` (
  `client_id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Clients`
--

INSERT INTO `Clients` (`client_id`, `fname`, `lname`, `phone`, `email`, `address`, `city`) VALUES
(1, 'Calvin', 'Todd', '703-282-6899', 'toddcal@oregonstate.edu', '220 Evergreen Avenue', 'Imperial Beach'),
(2, 'Michelle', 'Gomez', '619-550-4200', 'MishSquish@BestGFEver.com', '220 Evergreen Avenue', 'Imperial Beach'),
(3, 'Jake', 'Peralta', '718-099-0099', 'NineNine@NYPD.com', '420 Nakatomi Plaza', 'New York'),
(4, 'Rockito', 'Gomez', '619-789-9874', 'AVeryGoodBoy@BestDoggitos.com', '220 Evergreen Avenue', 'Tijuana'),
(5, 'Queso', 'Todd', '456-123-1324', 'BigChonkers@AlwaysHungry.org', '220 Evergreen Avenue', 'Imperial Beach'),
(6, 'Bilbo', 'Baggins', '888-879-8888', 'LeadRingAppraiser@BagEnd.com', '2315 Bag End', 'Shire');

-- --------------------------------------------------------

--
-- Table structure for table `Clients_Articles`
--

CREATE TABLE `Clients_Articles` (
  `date_recommended` date DEFAULT NULL,
  `article_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Clients_Articles`
--

INSERT INTO `Clients_Articles` (`date_recommended`, `article_id`, `client_id`) VALUES
('2021-05-03', 5, 1),
('2021-01-30', 3, 2),
('2021-05-04', 7, 1),
('2022-03-09', 10, 4),
('2023-05-03', 15, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Clients_Conditions`
--

CREATE TABLE `Clients_Conditions` (
  `client_id` int(11) NOT NULL,
  `condition_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Clients_Conditions`
--

INSERT INTO `Clients_Conditions` (`client_id`, `condition_id`) VALUES
(1, 1),
(2, 6),
(1, 6),
(4, 3),
(5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Clients_Supplements`
--

CREATE TABLE `Clients_Supplements` (
  `date_recommended` date DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `supplement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Clients_Supplements`
--

INSERT INTO `Clients_Supplements` (`date_recommended`, `client_id`, `supplement_id`) VALUES
('2021-05-03', 1, 9),
('2021-01-30', 2, 2),
('2021-05-04', 1, 11),
('2022-03-09', 4, 7),
('2023-05-03', 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Conditions`
--

CREATE TABLE `Conditions` (
  `condition_id` int(11) NOT NULL,
  `condition_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Conditions`
--

INSERT INTO `Conditions` (`condition_id`, `condition_name`) VALUES
(7, 'Diabetes'),
(3, 'Gut Health'),
(4, 'Heart Disease'),
(1, 'High Blood Pressure'),
(6, 'Low Energy'),
(2, 'Non-Alcoholic Fatty Liver'),
(5, 'Weight Loss');

-- --------------------------------------------------------

--
-- Table structure for table `Conditions_Articles`
--

CREATE TABLE `Conditions_Articles` (
  `condition_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Conditions_Articles`
--

INSERT INTO `Conditions_Articles` (`condition_id`, `article_id`) VALUES
(1, 5),
(2, 13),
(6, 12),
(3, 10),
(2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `Conditions_Supplements`
--

CREATE TABLE `Conditions_Supplements` (
  `condition_id` int(11) NOT NULL,
  `supplement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Conditions_Supplements`
--

INSERT INTO `Conditions_Supplements` (`condition_id`, `supplement_id`) VALUES
(1, 2),
(2, 2),
(6, 9),
(3, 11),
(2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `Consultations`
--

CREATE TABLE `Consultations` (
  `consultation_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `paid` tinyint(1) NOT NULL DEFAULT 0,
  `note` mediumtext DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Consultations`
--

INSERT INTO `Consultations` (`consultation_id`, `date`, `time`, `completed`, `paid`, `note`, `client_id`) VALUES
(1, '2021-05-03', '12:30:00', 1, 0, 'Saw Calvin in regards to his Gut Health.  I reccomended him stop eating Rally\'s Spicy Chicken Sandwhiches at 2AM.  He Responded \"NEVER\" and ran out of the room, presumably to go back to Rally\'s', 1),
(2, '2021-01-30', '12:30:00', 1, 1, 'Michelle is genuinely one of the best people I have ever seen.  She is healthy and beautiful, and outside a strange obsession with Friends perfect.  No reccomendations made.', 2),
(3, '2021-05-04', '12:30:00', 1, 0, 'Saw Calvin again this time about his blood pressure.  He blamed it on something called CS344, but I reminded him that fast food like Rally\'s Spicy Chicken Sandwhiches can cuase High Blood Pressure as Well.  He started Crying.', 1),
(4, '2022-03-09', '12:30:00', 0, 0, NULL, 4),
(5, '2023-05-03', '12:30:00', 0, 0, NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Supplements`
--

CREATE TABLE `Supplements` (
  `supplement_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `brand_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Supplements`
--

INSERT INTO `Supplements` (`supplement_id`, `type`, `brand_id`) VALUES
(1, 'Milkthistle', 4),
(2, 'Magnesium', NULL),
(3, 'Cats Whiskers', 4),
(4, 'Vitamin C', 3),
(5, 'Iron', NULL),
(6, 'Valarian Root', 2),
(7, 'Eye of Newt', 2),
(8, 'Vitamin D', NULL),
(9, 'Multi(pass) Vitamin', 1),
(10, 'Calcium', 1),
(11, 'Fiber', NULL),
(12, 'Vitamin B', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Supplements_Articles`
--

CREATE TABLE `Supplements_Articles` (
  `supplement_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Supplements_Articles`
--

INSERT INTO `Supplements_Articles` (`supplement_id`, `article_id`) VALUES
(9, 5),
(2, 4),
(11, 10),
(7, 13),
(1, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`article_id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `Brands`
--
ALTER TABLE `Brands`
  ADD PRIMARY KEY (`brand_id`),
  ADD UNIQUE KEY `brand_name` (`brand_name`);

--
-- Indexes for table `Clients`
--
ALTER TABLE `Clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `Clients_Articles`
--
ALTER TABLE `Clients_Articles`
  ADD KEY `article_id` (`article_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `Clients_Conditions`
--
ALTER TABLE `Clients_Conditions`
  ADD KEY `client_id` (`client_id`),
  ADD KEY `condition_id` (`condition_id`);

--
-- Indexes for table `Clients_Supplements`
--
ALTER TABLE `Clients_Supplements`
  ADD KEY `client_id` (`client_id`),
  ADD KEY `supplement_id` (`supplement_id`);

--
-- Indexes for table `Conditions`
--
ALTER TABLE `Conditions`
  ADD PRIMARY KEY (`condition_id`),
  ADD UNIQUE KEY `condition_name` (`condition_name`);

--
-- Indexes for table `Conditions_Articles`
--
ALTER TABLE `Conditions_Articles`
  ADD KEY `condition_id` (`condition_id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `Conditions_Supplements`
--
ALTER TABLE `Conditions_Supplements`
  ADD KEY `condition_id` (`condition_id`),
  ADD KEY `supplement_id` (`supplement_id`);

--
-- Indexes for table `Consultations`
--
ALTER TABLE `Consultations`
  ADD PRIMARY KEY (`consultation_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `Supplements`
--
ALTER TABLE `Supplements`
  ADD PRIMARY KEY (`supplement_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `Supplements_Articles`
--
ALTER TABLE `Supplements_Articles`
  ADD KEY `supplement_id` (`supplement_id`),
  ADD KEY `article_id` (`article_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Articles`
--
ALTER TABLE `Articles`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Brands`
--
ALTER TABLE `Brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Clients`
--
ALTER TABLE `Clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Conditions`
--
ALTER TABLE `Conditions`
  MODIFY `condition_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Consultations`
--
ALTER TABLE `Consultations`
  MODIFY `consultation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Supplements`
--
ALTER TABLE `Supplements`
  MODIFY `supplement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Clients_Articles`
--
ALTER TABLE `Clients_Articles`
  ADD CONSTRAINT `Clients_Articles_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`article_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Clients_Articles_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE CASCADE;

--
-- Constraints for table `Clients_Conditions`
--
ALTER TABLE `Clients_Conditions`
  ADD CONSTRAINT `Clients_Conditions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Clients_Conditions_ibfk_2` FOREIGN KEY (`condition_id`) REFERENCES `Conditions` (`condition_id`) ON DELETE CASCADE;

--
-- Constraints for table `Clients_Supplements`
--
ALTER TABLE `Clients_Supplements`
  ADD CONSTRAINT `Clients_Supplements_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Clients_Supplements_ibfk_2` FOREIGN KEY (`supplement_id`) REFERENCES `Supplements` (`supplement_id`) ON DELETE CASCADE;

--
-- Constraints for table `Conditions_Articles`
--
ALTER TABLE `Conditions_Articles`
  ADD CONSTRAINT `Conditions_Articles_ibfk_1` FOREIGN KEY (`condition_id`) REFERENCES `Conditions` (`condition_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Conditions_Articles_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`article_id`) ON DELETE CASCADE;

--
-- Constraints for table `Conditions_Supplements`
--
ALTER TABLE `Conditions_Supplements`
  ADD CONSTRAINT `Conditions_Supplements_ibfk_1` FOREIGN KEY (`condition_id`) REFERENCES `Conditions` (`condition_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Conditions_Supplements_ibfk_2` FOREIGN KEY (`supplement_id`) REFERENCES `Supplements` (`supplement_id`) ON DELETE CASCADE;

--
-- Constraints for table `Consultations`
--
ALTER TABLE `Consultations`
  ADD CONSTRAINT `Consultations_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE CASCADE;

--
-- Constraints for table `Supplements`
--
ALTER TABLE `Supplements`
  ADD CONSTRAINT `Supplements_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `Brands` (`brand_id`) ON DELETE CASCADE;

--
-- Constraints for table `Supplements_Articles`
--
ALTER TABLE `Supplements_Articles`
  ADD CONSTRAINT `Supplements_Articles_ibfk_1` FOREIGN KEY (`supplement_id`) REFERENCES `Supplements` (`supplement_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Supplements_Articles_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`article_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
