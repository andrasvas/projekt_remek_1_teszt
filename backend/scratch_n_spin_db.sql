-- Töröljük a meglévő adatbázist, ha létezik
DROP DATABASE IF EXISTS scratch_and_spin_db;
CREATE SCHEMA scratch_and_spin_db;
USE scratch_and_spin_db;
 
-- Label-ek
CREATE TABLE labels (
  label_id INT(11) NOT NULL AUTO_INCREMENT,
  label_name VARCHAR(255) DEFAULT NULL,
  label_link TEXT DEFAULT NULL,
  PRIMARY KEY (label_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
-- Műfajok
CREATE TABLE genres (
  genre_id INT(11) NOT NULL AUTO_INCREMENT,
  genre_name VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (genre_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
-- Vinyl-ek
CREATE TABLE vinyls (
  vinyl_id INT(11) NOT NULL AUTO_INCREMENT,
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
  spotify_link TEXT DEFAULT NULL,
  PRIMARY KEY (vinyl_id),
  FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE SET NULL,
  FOREIGN KEY (label_id) REFERENCES labels(label_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
CREATE TABLE users (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  user_last_name VARCHAR(255) DEFAULT NULL,
  user_first_name VARCHAR(255) DEFAULT NULL,
  user_phone_number INT(11) DEFAULT NULL,
  user_email VARCHAR(255) DEFAULT NULL,
  user_password VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
-- Kartáblák
CREATE TABLE cart (
  cart_id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) DEFAULT NULL,
  PRIMARY KEY (cart_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
CREATE TABLE cart_item (
  cart_id INT(11) NOT NULL,
  vinyl_id INT(11) NOT NULL,
  qty INT(11) DEFAULT NULL,
  PRIMARY KEY (cart_id, vinyl_id),
  FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE,
  FOREIGN KEY (vinyl_id) REFERENCES vinyls(vinyl_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
-- Egyedi vinyl táblák
CREATE TABLE custom_vinyl (
  custom_vinyl_id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) DEFAULT NULL,
  vinyl_name VARCHAR(255) DEFAULT NULL,
  vinyl_size INT(11) DEFAULT NULL,
  price INT(11) DEFAULT NULL,
  vinyl_weight INT(11) DEFAULT NULL,
  image_path VARCHAR(255) DEFAULT NULL,
  custom_design TEXT DEFAULT NULL,
  vinyl_rpm INT(11) DEFAULT NULL,
  created_at DATETIME DEFAULT NULL,
  PRIMARY KEY (custom_vinyl_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
-- Rendelések
CREATE TABLE orders (
  order_id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) DEFAULT NULL,
  address VARCHAR(255) DEFAULT NULL,
  status VARCHAR(50) DEFAULT NULL,
  order_date DATETIME DEFAULT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
-- Rendelési tételek
CREATE TABLE order_item (
  order_id INT(11) NOT NULL,
  vinyl_id INT(11) NOT NULL,
  amount INT(11) DEFAULT NULL,
  price INT(11) DEFAULT NULL,
  custom_vinyl_id INT(11) NOT NULL,
  PRIMARY KEY (order_id, vinyl_id, custom_vinyl_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (vinyl_id) REFERENCES vinyls(vinyl_id) ON DELETE CASCADE,
  FOREIGN KEY (custom_vinyl_id) REFERENCES custom_vinyl(custom_vinyl_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
-- Feltöltés a labels táblába valós kiadókkal
INSERT INTO `labels` (`label_name`, `label_link`) VALUES
('Roadrunner Records', 'https://www.elektra.com/roadrunnerrecords'),
('Epitaph Records', 'https://www.epitaph.com/'),
('Fueled by Ramen', 'https://www.elektra.com/fueledbyramen'),
('Hopeless Records', 'https://www.hopelessrecords.com/'),
('Rise Records', 'https://www.riserecords.com/'),
('Fearless Records', 'https://www.fearlessrecords.com/'),
('Spinefarm Records', 'https://www.spinefarmrecords.com/'),
('Sumerian Records', 'https://www.sumerianrecords.com/'),
('Nuclear Blast', 'https://www.nuclearblast.com/'),
('Pure Noise Records', 'https://www.purenoiserecords.com/'),
('Republic Records', 'https://www.republicrecords.com/'),
('Capitol Records', 'https://www.capitolrecords.com/'),
('Island Records', 'https://www.islandrecords.com/'),
('Def Jam Recordings', 'https://www.defjam.com/'),
('Atlantic Records', 'https://www.atlanticrecords.com/');
 
-- Feltöltés a genres táblába specifikus műfajokkal
INSERT INTO `genres` (`genre_name`) VALUES
('Metalcore'),
('Post-Hardcore'),
('Alternative Rock'),
('Pop Punk'),
('Indie Rock'),
('Hard Rock'),
('Electronic Rock'),
('Progressive Metal'),
('Deathcore'),
('Synthwave'),
('Pop'),
('Rap'),
('Hip-Hop'),
('R&B'),
('Electronic');
 
-- Feltöltés a vinyls táblába valós albumokkal (javított id-k)
INSERT INTO `vinyls` (`vinyl_amount`, `vinyl_artist`, `vinyl_color`, `vinyl_name`, `price`, `in_stock`, `vinyl_rpm`, `vinyl_weight`, `vinyl_size`, `genre_id`, `vinyl_release`, `label_id`, `vinyl_description`, `image_path`, `spotify_link`) VALUES
(1, 'Bring Me The Horizon', 'Black', 'Sempiternal', 25, 100, 33, 180, 12, 1, '2013', 1, 'A breakthrough album for BMTH', 'sempiternal.jpg', 'https://spotify.com/sempiternal'),
(1, 'Architects', 'Red', 'Holy Hell', 28, 50, 33, 180, 12, 1, '2018', 1, 'A tribute to Tom Searle', 'holyhell.jpg', 'https://spotify.com/holyhell'),
(1, 'A Day to Remember', 'Blue', 'Homesick', 22, 75, 33, 180, 12, 1, '2009', 14, 'A mix of pop punk and metalcore', 'homesick.jpg', 'https://spotify.com/homesick'),
(1, 'Paramore', 'Yellow', 'Riot!', 20, 120, 33, 180, 12, 4, '2007', 13, 'A pop-punk classic', 'riot.jpg', 'https://spotify.com/riot'),
(1, 'Linkin Park', 'Silver', 'Hybrid Theory', 30, 60, 33, 180, 12, 6, '2000', 12, 'The debut album that changed nu-metal', 'hybridtheory.jpg', 'https://spotify.com/hybridtheory'),
(1, 'Slipknot', 'Gray', 'We Are Not Your Kind', 32, 40, 33, 180, 12, 1, '2019', 1, 'Experimental yet heavy', 'wanyk.jpg', 'https://spotify.com/wanyk'),
(1, 'Parkway Drive', 'Gold', 'Reverence', 27, 30, 33, 180, 12, 1, '2018', 1, 'Melodic yet crushing metalcore', 'reverence.jpg', 'https://spotify.com/reverence'),
(1, 'Beartooth', 'Orange', 'Disease', 25, 80, 33, 180, 12, 2, '2018', 1, 'A powerful post-hardcore album', 'disease.jpg', 'https://spotify.com/disease'),
(1, 'The Amity Affliction', 'Green', 'Let the Ocean Take Me', 22, 90, 33, 180, 12, 2, '2014', 1, 'Emotional and heavy', 'ocean.jpg', 'https://spotify.com/ocean'),
(1, 'Ghost', 'White', 'Prequelle', 30, 45, 33, 180, 12, 8, '2018', 9, 'Occult rock with a touch of metal', 'prequelle.jpg', 'https://spotify.com/prequelle'),
(1, 'Taylor Swift', 'Pink', '1989', 28, 70, 33, 180, 12, 11, '2014', 11, 'A pop masterpiece', '1989.jpg', 'https://spotify.com/1989'),
(1, 'Billie Eilish', 'Black', 'Happier Than Ever', 29, 60, 33, 180, 12, 11, '2021', 11, 'A deep and introspective album', 'happier.jpg', 'https://spotify.com/happier'),
(1, 'Drake', 'Gold', 'Scorpion', 32, 85, 33, 180, 12, 13, '2018', 11, 'A hit-packed rap album', 'scorpion.jpg', 'https://spotify.com/scorpion'),
(1, 'Post Malone', 'White', 'Hollywood’s Bleeding', 30, 90, 33, 180, 12, 13, '2019', 4, 'A unique blend of rap and rock', 'hollywood.jpg', 'https://spotify.com/hollywood'),
(1, 'Poppy', 'White', 'Negative Spaces', 26, 100, 33, 180, 12, 1, '2023', 8, 'Emotional representative of inner feelings and thoughts', 'negativespaces.jpg', 'https://spotify.com/echoes'),
(1, 'Dua Lipa', 'Purple', 'Future Nostalgia', 27, 75, 33, 180, 12, 11, '2020', 1, 'A retro-inspired pop album', 'futurenostalgia.jpg', 'https://spotify.com/futurenostalgia'),
(1, 'The Weeknd', 'Red', 'After Hours', 29, 85, 33, 180, 12, 14, '2020', 1, 'A cinematic R&B journey', 'afterhours.jpg', 'https://spotify.com/afterhours'),
(1, 'Tool', 'Black', 'Fear Inoculum', 35, 50, 33, 180, 12, 8, '2019', 9, 'A progressive metal masterpiece', 'fearinoculum.jpg', 'https://spotify.com/fearinoculum'),
(1, 'Three Days Grace', 'Gray', 'One-X', 25, 95, 33, 180, 12, 6, '2006', 6, 'A classic alternative rock album', 'onex.jpg', 'https://spotify.com/onex'),
(1, 'Weezer', 'Blue', 'Weezer (Blue Album)', 22, 110, 33, 180, 12, 5, '1994', 5, 'A legendary indie rock debut', 'weezerblue.jpg', 'https://spotify.com/weezerblue'),
(1, 'Lorna Shore', 'Black', 'Pain Remains', 30, 40, 33, 180, 12, 9, '2022', 8, 'A brutal deathcore album', 'painremains.jpg', 'https://spotify.com/painremains'),
(1, 'The Midnight', 'Purple', 'Endless Summer', 24, 65, 33, 180, 12, 10, '2016', 1, 'A *Endless Summer* a The Midnight 2020-as albuma, amely a 80-as évek szintetizátorokkal, retro hangzású elektronikus poppal és nosztalgikus dallamokkal egyedülálló hangulatot teremt. Az album a nyári szabadság érzését, a fiatalos lendületet és a végtelen naplementéket idézi meg, miközben mélyebb érzelmeket is felszínre hoz, mint a magány, a vágyakozás és a kapcsolatkeresés. Az album a The Midnight jellegzetes stílusát hozza, mely egyesíti a szintipop, az indie rock és a chillwave elemeit. Az *Endless Summer* egy igazi hangulatbombát jelent a nosztalgikus zenekedvelők számára, miközben friss és modern is marad.', 'endlesssummer.jpg', 'https://spotify.com/endlesssummer'),
(1, 'Kendrick Lamar', 'Gold', 'To Pimp a Butterfly', 31, 80, 33, 180, 12, 13, '2015', 4, 'A groundbreaking hip-hop album', 'tpab.jpg', 'https://spotify.com/tpab'),
(1, 'Daft Punk', 'Silver', 'Random Access Memories', 28, 70, 33, 180, 12, 6, '2013', 5, 'A modern electronic masterpiece', 'ram.jpg', 'https://spotify.com/ram'),
(1, 'Arctic Monkeys', 'White', 'AM', 26, 90, 33, 180, 12, 5, '2013', 2, 'A modern indie rock classic', 'am.jpg', 'https://spotify.com/am');