-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 02, 2018 at 06:38 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pawnapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `id_number` varchar(50) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `valid_id` varchar(255) DEFAULT NULL,
  `valid_id_number` varchar(255) DEFAULT NULL,
  `address` text,
  `created` datetime NOT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=MyISAM AUTO_INCREMENT=90 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `id_number`, `firstname`, `lastname`, `contact_number`, `birthday`, `valid_id`, `valid_id_number`, `address`, `created`, `modified`) VALUES
(82, 'test1', 'test1', 'test1', 'test1', '10/02/2018', 'test1', '123213213', 'test1', '2018-10-23 11:10:10', NULL),
(81, '123456', 'Reynel', 'Fuertes', '9173045895', '11/02/2018', 'Drivers Licensed', '2340-242-234242-23', 'Lot8 Condominium', '2018-10-23 00:00:00', NULL),
(83, 'test2', 'test52', 'test2', 'test2', '09/02/2018', 'test2', 'test2', 'test2', '2018-10-24 03:10:15', NULL),
(89, '1111111111', '1111111111', '1111111111', '1111111111', '10/24/2018', '1111111111', '1111111111', '1111111111', '2018-10-30 07:10:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(255) NOT NULL,
  `item_name` text NOT NULL,
  `item_type` varchar(255) NOT NULL,
  `grams` float NOT NULL,
  `karat` float NOT NULL,
  `description` text NOT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `sku`, `item_name`, `item_type`, `grams`, `karat`, `description`, `created`, `modified`) VALUES
(9, 'ITM-444234', 'Item 2', 'type 2', 2, 2, 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', '2018-11-02 12:11:12', NULL),
(10, 'ITM-233333333', 'Item 3', 'type 3', 3, 3, ' randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the', '2018-11-02 12:11:12', NULL),
(6, 'SKU-12345', 'item 1', 'type 1', 1, 1, 'According to the documentation, there is indeed no such tag on the DataTable. I had the same problem/question. And I solved it by creating a second ', '2018-11-02 02:11:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `item_types`
--

DROP TABLE IF EXISTS `item_types`;
CREATE TABLE IF NOT EXISTS `item_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item_types`
--

INSERT INTO `item_types` (`id`, `name`, `description`) VALUES
(1, 'type 1', 'type description 1'),
(2, 'type 2', 'type description 2'),
(3, 'type 3', 'type 3');

-- --------------------------------------------------------

--
-- Table structure for table `pawns`
--

DROP TABLE IF EXISTS `pawns`;
CREATE TABLE IF NOT EXISTS `pawns` (
  `pawn_id` int(11) NOT NULL AUTO_INCREMENT,
  `pawn_ticket_number` varchar(255) DEFAULT NULL,
  `pawn_date_granted` varchar(255) DEFAULT NULL,
  `pawn_maturity_date` varchar(255) DEFAULT NULL,
  `pawn_expiry_date` varchar(255) DEFAULT NULL,
  `pawn_interest` float DEFAULT NULL,
  `pawn_amount` float DEFAULT NULL,
  `pawn_total_amount` float DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`pawn_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pawns`
--

INSERT INTO `pawns` (`pawn_id`, `pawn_ticket_number`, `pawn_date_granted`, `pawn_maturity_date`, `pawn_expiry_date`, `pawn_interest`, `pawn_amount`, `pawn_total_amount`, `account_id`, `item_id`, `created`, `modified`) VALUES
(10, 'PWN-111111', '11/01/2018', '10/05/2018', '10/05/2018', 123, 123, 123, 81, 9, '2018-11-01 12:11:03', '2018-11-01 06:11:52'),
(9, 'PWN-22222', '11/01/2018', '10/05/2018', '10/05/2018', 123, 123, 123, 81, 6, '2018-11-01 04:11:08', '2018-11-01 06:11:03'),
(11, 'PWN-33333', '11/01/2018', '10/05/2018', '10/05/2018', 123, 123, 123, 82, 10, '2018-11-01 12:11:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `redemptions`
--

DROP TABLE IF EXISTS `redemptions`;
CREATE TABLE IF NOT EXISTS `redemptions` (
  `redemption_id` int(11) NOT NULL AUTO_INCREMENT,
  `redemption_date` datetime NOT NULL,
  `redemption_amount` float NOT NULL,
  `redemption_total_amount` float NOT NULL,
  `pawn_id` int(11) NOT NULL,
  `remarks` text NOT NULL,
  `interest` float NOT NULL,
  `difference` float NOT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`redemption_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `renewals`
--

DROP TABLE IF EXISTS `renewals`;
CREATE TABLE IF NOT EXISTS `renewals` (
  `renewal_id` int(11) NOT NULL AUTO_INCREMENT,
  `renewal_date` varchar(255) DEFAULT NULL,
  `renewal_pawn_ticket` varchar(255) DEFAULT NULL,
  `pawn_id` int(8) NOT NULL,
  `renewal_amount` float DEFAULT NULL,
  `renewal_total_amount` float DEFAULT NULL,
  `interest` float DEFAULT NULL,
  `difference` float DEFAULT NULL,
  `remarks` text,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`renewal_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1006 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `renewals`
--

INSERT INTO `renewals` (`renewal_id`, `renewal_date`, `renewal_pawn_ticket`, `pawn_id`, `renewal_amount`, `renewal_total_amount`, `interest`, `difference`, `remarks`, `created`, `modified`) VALUES
(1004, '11/16/2018', '1234', 10, 123, 1234, 1234, 1234, 'web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still', '2018-11-03 12:11:42', '2018-11-03 12:11:50'),
(1001, '11/02/2018', '678', 11, 1000, 1500, 0.1, 2, 'College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable', '2018-11-02 11:11:25', NULL),
(1002, '11/10/2018', 'RNW-0000001', 9, 123, 123, 123, 123, 'ood and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line o', '2018-11-03 12:11:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `fullname` text NOT NULL,
  `role` int(11) NOT NULL,
  `token` text NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `fullname`, `role`, `token`, `created`, `modified`) VALUES
(1, 'boyet@gmail.com', 'W0JJXHASVeBtUEfi', 'administrator', 1, 'eXmT85eHM3sFCkwSJs5H8a142tk8Svwdd943rLnj1xfEmrEQBGf93qPPwvUnbU3nkbvpTWhW60ypGNr6ddkD6A4mrWGUFOzNRe3j', '2018-09-12 00:00:00', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
