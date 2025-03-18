-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 24. 00:03
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

create database if not exists scratch_n_spin_test;
use scratch_n_spin_test;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `scratch_n_spin_test`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vinyls`
--

CREATE TABLE `vinyls` (
  `vin_id` int(11) NOT NULL,
  `vin_name` varchar(75) NOT NULL,
  `tracks` int(11) NOT NULL,
  `runtime` int(11) NOT NULL,
  `color` varchar(30) NOT NULL,
  `artist` varchar(85) NOT NULL,
  `genre` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `vinyls`
--

INSERT INTO `vinyls` (`vin_id`, `vin_name`, `tracks`, `runtime`, `color`, `artist`, `genre`) VALUES
(1, 'Thriller', 9, 42, 'Black', 'Michael Jackson', 'Pop'),
(2, 'The Dark Side of the Moon', 10, 43, 'Black', 'Pink Floyd', 'Progressive Rock'),
(3, 'Abbey Road', 17, 47, 'Black', 'The Beatles', 'Rock'),
(4, 'Rumours', 11, 39, 'Transparent', 'Fleetwood Mac', 'Soft Rock'),
(5, 'Back in Black', 10, 42, 'Black', 'AC/DC', 'Hard Rock'),
(6, 'Born to Run', 8, 39, 'Blue', 'Bruce Springsteen', 'Rock'),
(7, 'Purple Rain', 9, 44, 'Purple', 'Prince', 'Pop Rock'),
(8, 'Hotel California', 9, 43, 'Gold', 'Eagles', 'Rock'),
(9, 'Nevermind', 12, 49, 'Blue', 'Nirvana', 'Grunge'),
(10, 'Random Access Memories', 13, 74, 'Silver', 'Daft Punk', 'Electronic'),
(11, 'Good Kid, M.A.A.D City', 12, 68, 'Red', 'Kendrick Lamar', 'Hip-Hop'),
(12, 'My Beautiful Dark Twisted Fantasy', 13, 68, 'Red', 'Kanye West', 'Hip-Hop'),
(13, 'The Marshall Mathers LP', 18, 72, 'Black', 'Eminem', 'Hip-Hop'),
(14, 'DAMN.', 14, 55, 'Clear', 'Kendrick Lamar', 'Hip-Hop'),
(15, 'Blonde', 17, 60, 'Yellow', 'Frank Ocean', 'R&B'),
(16, 'To Pimp a Butterfly', 16, 79, 'Black', 'Kendrick Lamar', 'Hip-Hop'),
(17, '21', 11, 48, 'Black', 'Adele', 'Pop'),
(18, '1989', 13, 48, 'Pink', 'Taylor Swift', 'Pop'),
(19, 'Lover', 18, 61, 'Pastel Pink', 'Taylor Swift', 'Pop'),
(20, 'Fearless', 13, 53, 'Gold', 'Taylor Swift', 'Country Pop'),
(21, 'AM', 12, 42, 'White', 'Arctic Monkeys', 'Indie Rock'),
(22, 'Tranquility Base Hotel & Casino', 11, 40, 'Silver', 'Arctic Monkeys', 'Alternative Rock'),
(23, 'Parachutes', 10, 41, 'Yellow', 'Coldplay', 'Alternative Rock'),
(24, 'A Rush of Blood to the Head', 11, 54, 'White', 'Coldplay', 'Alternative Rock'),
(25, 'Viva La Vida or Death and All His Friends', 10, 45, 'Blue', 'Coldplay', 'Alternative Rock'),
(26, 'Meteora', 13, 36, 'Black', 'Linkin Park', 'Nu Metal'),
(27, 'Hybrid Theory', 12, 37, 'Red', 'Linkin Park', 'Nu Metal'),
(28, 'The Wall', 26, 81, 'Pink', 'Pink Floyd', 'Progressive Rock'),
(29, 'OK Computer', 12, 53, 'White', 'Radiohead', 'Alternative Rock'),
(30, 'Kid A', 10, 50, 'Transparent', 'Radiohead', 'Experimental Rock'),
(31, 'Lateralus', 13, 79, 'Black', 'Tool', 'Progressive Metal');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `vinyls`
--
ALTER TABLE `vinyls`
  ADD PRIMARY KEY (`vin_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `vinyls`
--
ALTER TABLE `vinyls`
  MODIFY `vin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
