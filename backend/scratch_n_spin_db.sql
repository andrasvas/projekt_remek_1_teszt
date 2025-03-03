-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 03. 11:08
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

drop database if exists scratch_and_spin_db;
create database scratch_and_spin_db;
use scratch_and_spin_db;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `scratch_and_spin_db`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cart_item`
--

CREATE TABLE `cart_item` (
  `cart_id` int(11) NOT NULL,
  `vinyl_id` int(11) NOT NULL,
  `qty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `custom_vinyl`
--

CREATE TABLE `custom_vinyl` (
  `custom_vinyl_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vinyl_name` varchar(255) DEFAULT NULL,
  `vinyl_size` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `vinyl_weight` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `custom_design` text DEFAULT NULL,
  `vinyl_rpm` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `genres`
--

CREATE TABLE `genres` (
  `genre_id` int(11) NOT NULL,
  `genre_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `genres`
--

INSERT INTO `genres` (`genre_id`, `genre_name`) VALUES
(1, 'Rock'),
(2, 'Pop'),
(3, 'Jazz'),
(4, 'Classical'),
(5, 'Hip-Hop'),
(6, 'Electronic'),
(7, 'Blues'),
(8, 'Country'),
(9, 'Reggae'),
(10, 'Metal');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `labels`
--

CREATE TABLE `labels` (
  `label_id` int(11) NOT NULL,
  `label_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `labels`
--

INSERT INTO `labels` (`label_id`, `label_name`) VALUES
(1, 'Atlantic Records'),
(2, 'Columbia Records'),
(3, 'Warner Bros. Records'),
(4, 'Universal Music Group'),
(5, 'Sony Music Entertainment'),
(6, 'EMI'),
(7, 'Interscope Records'),
(8, 'Def Jam Recordings'),
(9, 'Motown Records'),
(10, 'Sub Pop');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_item`
--

CREATE TABLE `order_item` (
  `order_id` int(11) NOT NULL,
  `vinyl_id` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `custom_vinyl_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_last_name` varchar(255) DEFAULT NULL,
  `user_first_name` varchar(255) DEFAULT NULL,
  `user_phone_number` int(11) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vinyls`
--

CREATE TABLE `vinyls` (
  `vinyl_id` int(11) NOT NULL,
  `vinyl_amount` int(11) DEFAULT NULL,
  `vinyl_color` varchar(50) DEFAULT NULL,
  `vinyl_name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `in_stock` int(11) DEFAULT NULL,
  `vinyl_rpm` int(11) DEFAULT NULL,
  `vinyl_weight` int(11) DEFAULT NULL,
  `vinyl_size` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `vinyl_release` varchar(50) DEFAULT NULL,
  `label_id` int(11) DEFAULT NULL,
  `vinyl_description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `spotify_link` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `vinyls`
--

INSERT INTO Vinyls (vinyl_amount, vinyl_color, vinyl_name, price, in_stock, vinyl_rpm, vinyl_weight, vinyl_size, genre_id, vinyl_release, label_id, vinyl_description, image_path) VALUES
(30, 'Black', 'Born to Run', 2699, 20, 33, 180, 12, 2, '1975-08-25', 1, 'Bruce Springsteen’s anthemic and energetic album', '/images/borntorun2.jpg'),
(25, 'Red', 'The Velvet Underground & Nico', 2999, 15, 33, 180, 12, 1, '1967-03-12', 2, 'The Velvet Underground’s groundbreaking debut album', '/images/velvetunderground.jpg'),
(35, 'Blue', 'The Wall', 3499, 25, 33, 180, 12, 3, '1979-11-30', 3, 'Pink Floyd’s rock opera about alienation and personal conflict', '/images/thewall2.jpg'),
(40, 'Yellow', 'Exile on Main St.', 3199, 18, 33, 180, 12, 4, '1972-05-12', 4, 'The Rolling Stones’ sprawling and eclectic double album', '/images/exileonmainst.jpg'),
(15, 'Green', 'Led Zeppelin IV', 2799, 12, 33, 180, 12, 5, '1971-11-08', 5, 'Led Zeppelin’s iconic album with “Stairway to Heaven”', '/images/ledzeppeliniv2.jpg'),
(50, 'Purple', 'What’s Going On', 2899, 30, 33, 180, 12, 6, '1971-05-21', 6, 'Marvin Gaye’s socially conscious and soulful masterpiece', '/images/whatsgoingon.jpg'),
(20, 'White', 'London Calling', 2699, 15, 33, 180, 12, 7, '1979-12-14', 7, 'The Clash’s politically charged punk rock album', '/images/londoncalling.jpg'),
(25, 'Black', 'Bridge Over Troubled Water', 2599, 10, 33, 180, 12, 8, '1970-01-26', 8, 'Simon & Garfunkel’s haunting and emotional folk album', '/images/bridgeovertroubledwater.jpg'),
(30, 'Red', 'Rumours', 2999, 20, 33, 180, 12, 9, '1977-02-04', 9, 'Fleetwood Mac’s classic album about love and heartbreak', '/images/rumours2.jpg'),
(40, 'Blue', 'Purple Rain', 3299, 25, 33, 180, 12, 10, '1984-06-25', 10, 'Prince’s genre-defying album with timeless hits', '/images/purplerain2.jpg'),
(15, 'Green', 'Highway to Hell', 2799, 12, 33, 180, 12, 1, '1979-07-27', 11, 'AC/DC’s hard-hitting rock album', '/images/highwaytohell.jpg'),
(25, 'Yellow', 'The Chronic', 2999, 15, 33, 180, 12, 2, '1992-12-15', 12, 'Dr. Dre’s game-changing hip-hop album', '/images/thechronic2.jpg'),
(30, 'Purple', 'Back in Black', 3199, 20, 33, 180, 12, 3, '1980-07-25', 13, 'AC/DC’s legendary album with the iconic voice of Brian Johnson', '/images/backinblack2.jpg'),
(50, 'White', 'Sticky Fingers', 2799, 30, 33, 180, 12, 4, '1971-04-23', 14, 'The Rolling Stones’ raw and rebellious album', '/images/stickyfingers3.jpg'),
(35, 'Black', 'The Dark Side of the Moon', 3499, 25, 33, 180, 12, 5, '1973-03-01', 15, 'Pink Floyd’s atmospheric and immersive album', '/images/darkside4.jpg'),
(20, 'Red', 'Abbey Road', 2999, 18, 33, 180, 12, 6, '1969-09-26', 16, 'The Beatles’ swan song and a timeless masterpiece', '/images/abbeyroad2.jpg'),
(25, 'Blue', 'Thriller', 3299, 15, 33, 180, 12, 7, '1982-11-30', 17, 'Michael Jackson’s groundbreaking and record-breaking album', '/images/thriller2.jpg'),
(40, 'Yellow', 'Born in the U.S.A.', 2999, 20, 33, 180, 12, 8, '1984-06-04', 18, 'Bruce Springsteen’s patriotic and anthemic rock album', '/images/bornintheusa.jpg'),
(30, 'Green', 'Hotel California', 2899, 18, 33, 180, 12, 9, '1976-12-08', 19, 'Eagles’ classic rock album with iconic tracks', '/images/hotelcalifornia2.jpg'),
(25, 'Purple', 'The Queen Is Dead', 2599, 12, 33, 180, 12, 10, '1986-06-16', 20, 'The Smiths’ melancholic and poetic album', '/images/queenisdead2.jpg');


--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`cart_id`,`vinyl_id`),
  ADD KEY `vinyl_id` (`vinyl_id`);

--
-- A tábla indexei `custom_vinyl`
--
ALTER TABLE `custom_vinyl`
  ADD PRIMARY KEY (`custom_vinyl_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- A tábla indexei `labels`
--
ALTER TABLE `labels`
  ADD PRIMARY KEY (`label_id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`order_id`,`vinyl_id`,`custom_vinyl_id`),
  ADD KEY `vinyl_id` (`vinyl_id`),
  ADD KEY `custom_vinyl_id` (`custom_vinyl_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- A tábla indexei `vinyls`
--
ALTER TABLE `vinyls`
  ADD PRIMARY KEY (`vinyl_id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `label_id` (`label_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `custom_vinyl`
--
ALTER TABLE `custom_vinyl`
  MODIFY `custom_vinyl_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `genres`
--
ALTER TABLE `genres`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `labels`
--
ALTER TABLE `labels`
  MODIFY `label_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `vinyls`
--
ALTER TABLE `vinyls`
  MODIFY `vinyl_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Megkötések a táblához `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`),
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`vinyl_id`) REFERENCES `vinyls` (`vinyl_id`);

--
-- Megkötések a táblához `custom_vinyl`
--
ALTER TABLE `custom_vinyl`
  ADD CONSTRAINT `custom_vinyl_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Megkötések a táblához `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`vinyl_id`) REFERENCES `vinyls` (`vinyl_id`),
  ADD CONSTRAINT `order_item_ibfk_3` FOREIGN KEY (`custom_vinyl_id`) REFERENCES `custom_vinyl` (`custom_vinyl_id`);

--
-- Megkötések a táblához `vinyls`
--
ALTER TABLE `vinyls`
  ADD CONSTRAINT `vinyls_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`),
  ADD CONSTRAINT `vinyls_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `labels` (`label_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
