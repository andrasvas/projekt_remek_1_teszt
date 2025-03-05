
drop database if exists scratch_and_spin_db;
create schema scratch_and_spin_db;
use scratch_and_spin_db;

CREATE TABLE cart (
  cart_id INT(11) NOT NULL,
  user_id INT(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE cart_item (
  cart_id INT(11) NOT NULL,
  vinyl_id INT(11) NOT NULL,
  qty INT(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE custom_vinyl (
  custom_vinyl_id INT(11) NOT NULL,
  user_id INT(11) DEFAULT NULL,
  vinyl_name VARCHAR(255) DEFAULT NULL,
  vinyl_size INT(11) DEFAULT NULL,
  price INT(11) DEFAULT NULL,
  vinyl_weight INT(11) DEFAULT NULL,
  image_path VARCHAR(255) DEFAULT NULL,
  custom_design TEXT DEFAULT NULL,
  vinyl_rpm INT(11) DEFAULT NULL,
  created_at DATETIME DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE genres (
  genre_id INT(11) NOT NULL,
  genre_name VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE labels (
  label_id INT(11) NOT NULL,
  label_name VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE orders (
  order_id INT(11) NOT NULL,
  user_id INT(11) DEFAULT NULL,
  address VARCHAR(255) DEFAULT NULL,
  status VARCHAR(50) DEFAULT NULL,
  order_date DATETIME DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE order_item (
  order_id INT(11) NOT NULL,
  vinyl_id INT(11) NOT NULL,
  amount INT(11) DEFAULT NULL,
  price INT(11) DEFAULT NULL,
  custom_vinyl_id INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE users (
  user_id INT(11) NOT NULL,
  user_last_name VARCHAR(255) DEFAULT NULL,
  user_first_name VARCHAR(255) DEFAULT NULL,
  user_phone_number INT(11) DEFAULT NULL,
  user_email VARCHAR(255) DEFAULT NULL,
  user_password VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE vinyls (
  vinyl_id INT(11) NOT NULL,
  vinyl_amount INT(11) DEFAULT NULL,
  vinyl_artist VARCHAR(50) DEFAULT NULL,
  vinyl_color VARCHAR(50) DEFAULT NULL,
  vinyl_name VARCHAR(255) DEFAULT NULL,
  price INT(11) DEFAULT NULL,
  in_stock INT(11) DEFAULT NULL,
  vinyl_rpm INT(11) DEFAULT NULL,
  vinyl_weight INT(11) DEFAULT NULL,
  vinyl_size INT(11) DEFAULT NULL,
  genre_id INT(11) DEFAULT NULL,
  vinyl_release VARCHAR(50) DEFAULT NULL,
  label_id INT(11) DEFAULT NULL,
  vinyl_description TEXT DEFAULT NULL,
  image_path VARCHAR(255) DEFAULT NULL,
  spotify_link TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Feltöltés a labels táblába valós kiadókkal
INSERT INTO `labels` (`label_id`, `label_name`) VALUES
(1, 'Roadrunner Records'),
(2, 'Epitaph Records'),
(3, 'Fueled by Ramen'),
(4, 'Hopeless Records'),
(5, 'Rise Records'),
(6, 'Fearless Records'),
(7, 'Spinefarm Records'),
(8, 'Sumerian Records'),
(9, 'Nuclear Blast'),
(10, 'Pure Noise Records'),
(11, 'Republic Records'),
(12, 'Capitol Records'),
(13, 'Island Records'),
(14, 'Def Jam Recordings'),
(15, 'Atlantic Records');
 
-- Feltöltés a genres táblába specifikus műfajokkal
INSERT INTO `genres` (`genre_id`, `genre_name`) VALUES
(1, 'Metalcore'),
(2, 'Post-Hardcore'),
(3, 'Alternative Rock'),
(4, 'Pop Punk'),
(5, 'Indie Rock'),
(6, 'Hard Rock'),
(7, 'Electronic Rock'),
(8, 'Progressive Metal'),
(9, 'Deathcore'),
(10, 'Synthwave'),
(11, 'Pop'),
(12, 'Rap'),
(13, 'Hip-Hop'),
(14, 'R&B'),
(15, 'Electronic');
 
-- Feltöltés a vinyls táblába valós albumokkal
INSERT INTO `vinyls` (`vinyl_id`, `vinyl_amount`, `vinyl_artist`, `vinyl_color`, `vinyl_name`, `price`, `in_stock`, `vinyl_rpm`, `vinyl_weight`, `vinyl_size`, `genre_id`, `vinyl_release`, `label_id`, `vinyl_description`, `image_path`, `spotify_link`) VALUES
(1, 1, 'Bring Me The Horizon', 'Black', 'Sempiternal', 25, 100, 33, 180, 12, 1, '2013', 1, 'A breakthrough album for BMTH', 'sempiternal.jpg', 'https://spotify.com/sempiternal'),
(2, 1, 'Architects', 'Red', 'Holy Hell', 28, 50, 33, 180, 12, 1, '2018', 1, 'A tribute to Tom Searle', 'holyhell.jpg', 'https://spotify.com/holyhell'),
(3, 1, 'A Day to Remember', 'Blue', 'Homesick', 22, 75, 33, 180, 12, 1, '2009', 14, 'A mix of pop punk and metalcore', 'homesick.jpg', 'https://spotify.com/homesick'),
(4, 1, 'Paramore', 'Yellow', 'Riot!', 20, 120, 33, 180, 12, 4, '2007', 13, 'A pop-punk classic', 'riot.jpg', 'https://spotify.com/riot'),
(5, 1, 'Linkin Park', 'Silver', 'Hybrid Theory', 30, 60, 33, 180, 12, 6, '2000', 12, 'The debut album that changed nu-metal', 'hybridtheory.jpg', 'https://spotify.com/hybridtheory'),
(6, 1, 'Slipknot', 'Gray', 'We Are Not Your Kind', 32, 40, 33, 180, 12, 1, '2019', 1, 'Experimental yet heavy', 'wanyk.jpg', 'https://spotify.com/wanyk'),
(7, 1, 'Parkway Drive', 'Gold', 'Reverence', 27, 30, 33, 180, 12, 1, '2018', 1, 'Melodic yet crushing metalcore', 'reverence.jpg', 'https://spotify.com/reverence'),
(8, 1, 'Beartooth', 'Orange', 'Disease', 25, 80, 33, 180, 12, 2, '2018', 1, 'A powerful post-hardcore album', 'disease.jpg', 'https://spotify.com/disease'),
(9, 1, 'The Amity Affliction', 'Green', 'Let the Ocean Take Me', 22, 90, 33, 180, 12, 2, '2014', 1, 'Emotional and heavy', 'ocean.jpg', 'https://spotify.com/ocean'),
(10, 1, 'Ghost', 'White', 'Prequelle', 30, 45, 33, 180, 12, 8, '2018', 9, 'Occult rock with a touch of metal', 'prequelle.jpg', 'https://spotify.com/prequelle'),
(11, 1, 'Taylor Swift', 'Pink', '1989', 28, 70, 33, 180, 12, 11, '2014', 11, 'A pop masterpiece', '1989.jpg', 'https://spotify.com/1989'),
(12, 1, 'Billie Eilish', 'Black', 'Happier Than Ever', 29, 60, 33, 180, 12, 11, '2021', 11, 'A deep and introspective album', 'happier.jpg', 'https://spotify.com/happier'),
(13, 1, 'Drake', 'Gold', 'Scorpion', 32, 85, 33, 180, 12, 13, '2018', 24, 'A hit-packed rap album', 'scorpion.jpg', 'https://spotify.com/scorpion'),
(14, 1, 'Post Malone', 'White', 'Hollywood’s Bleeding', 30, 90, 33, 180, 12, 13, '2019', 4, 'A unique blend of rap and rock', 'hollywood.jpg', 'https://spotify.com/hollywood'),
(15, 1, 'Poppy', 'White', 'Negative Spaces', 26, 100, 33, 180, 12, 1, '2023', 8, 'Emotional representative of inner feelings and thoughts', 'negativespaces.jpg', 'https://spotify.com/echoes'),
(16, 1, 'Dua Lipa', 'Purple', 'Future Nostalgia', 27, 75, 33, 180, 12, 11, '2020', 1, 'A retro-inspired pop album', 'futurenostalgia.jpg', 'https://spotify.com/futurenostalgia'),
(17, 1, 'The Weeknd', 'Red', 'After Hours', 29, 85, 33, 180, 12, 14, '2020', 1, 'A cinematic R&B journey', 'afterhours.jpg', 'https://spotify.com/afterhours'),
(18, 1, 'Tool', 'Black', 'Fear Inoculum', 35, 50, 33, 180, 12, 8, '2019', 9, 'A progressive metal masterpiece', 'fearinoculum.jpg', 'https://spotify.com/fearinoculum'),
(19, 1, 'Three Days Grace', 'Gray', 'One-X', 25, 95, 33, 180, 12, 6, '2006', 6, 'A classic alternative rock album', 'onex.jpg', 'https://spotify.com/onex'),
(20, 1, 'Weezer', 'Blue', 'Weezer (Blue Album)', 22, 110, 33, 180, 12, 5, '1994', 5, 'A legendary indie rock debut', 'weezerblue.jpg', 'https://spotify.com/weezerblue'),
(21, 1, 'Lorna Shore', 'Black', 'Pain Remains', 30, 40, 33, 180, 12, 9, '2022', 8, 'A brutal deathcore album', 'painremains.jpg', 'https://spotify.com/painremains'),
(22, 1, 'The Midnight', 'Purple', 'Endless Summer', 24, 65, 33, 180, 12, 10, '2016', 0, 'A synthwave classic', 'endlesssummer.jpg', 'https://spotify.com/endlesssummer'),
(23, 1, 'Kendrick Lamar', 'Gold', 'To Pimp a Butterfly', 31, 80, 33, 180, 12, 13, '2015', 4, 'A groundbreaking hip-hop album', 'tpab.jpg', 'https://spotify.com/tpab'),
(24, 1, 'Daft Punk', 'Silver', 'Random Access Memories', 28, 70, 33, 180, 12, 6, '2013', 5, 'A modern electronic masterpiece', 'ram.jpg', 'https://spotify.com/ram'),
(25, 1, 'Arctic Monkeys', 'White', 'AM', 26, 90, 33, 180, 12, 5, '2013', 2, 'A modern indie rock classic', 'am.jpg', 'https://spotify.com/am');
