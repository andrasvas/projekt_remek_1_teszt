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
-- INSERT INTO `vinyls` (`vinyl_amount`, `vinyl_artist`, `vinyl_color`, `vinyl_name`, `price`, `in_stock`, `vinyl_rpm`, `vinyl_weight`, `vinyl_size`, `genre_id`, `vinyl_release`, `label_id`, `vinyl_description`, `image_path`, `spotify_link`) VALUES
-- (1, 'Bring Me The Horizon', 'Black', 'Sempiternal', 25, 100, 33, 180, 12, 1, '2013', 1, 'A breakthrough album for BMTH', 'sempiternal.jpg', 'https://spotify.com/sempiternal'),
-- (1, 'Architects', 'Red', 'Holy Hell', 28, 50, 33, 180, 12, 1, '2018', 1, 'A tribute to Tom Searle', 'holyhell.jpg', 'https://spotify.com/holyhell'),
-- (1, 'A Day to Remember', 'Blue', 'Homesick', 22, 75, 33, 180, 12, 1, '2009', 14, 'A mix of pop punk and metalcore', 'homesick.jpg', 'https://spotify.com/homesick'),
-- (1, 'Paramore', 'Yellow', 'Riot!', 20, 120, 33, 180, 12, 4, '2007', 13, 'A pop-punk classic', 'riot.jpg', 'https://spotify.com/riot'),
-- (1, 'Linkin Park', 'Silver', 'Hybrid Theory', 30, 60, 33, 180, 12, 6, '2000', 12, 'The debut album that changed nu-metal', 'hybridtheory.jpg', 'https://spotify.com/hybridtheory'),
-- (1, 'Slipknot', 'Gray', 'We Are Not Your Kind', 32, 40, 33, 180, 12, 1, '2019', 1, 'Experimental yet heavy', 'wanyk.jpg', 'https://spotify.com/wanyk'),
-- (1, 'Parkway Drive', 'Gold', 'Reverence', 27, 30, 33, 180, 12, 1, '2018', 1, 'Melodic yet crushing metalcore', 'reverence.jpg', 'https://spotify.com/reverence'),
-- (1, 'Beartooth', 'Orange', 'Disease', 25, 80, 33, 180, 12, 2, '2018', 1, 'A powerful post-hardcore album', 'disease.jpg', 'https://spotify.com/disease'),
-- (1, 'The Amity Affliction', 'Green', 'Let the Ocean Take Me', 22, 90, 33, 180, 12, 2, '2014', 1, 'Emotional and heavy', 'ocean.jpg', 'https://spotify.com/ocean'),
-- (1, 'Ghost', 'White', 'Prequelle', 30, 45, 33, 180, 12, 8, '2018', 9, 'Occult rock with a touch of metal', 'prequelle.jpg', 'https://spotify.com/prequelle'),
-- (1, 'Taylor Swift', 'Pink', '1989', 28, 70, 33, 180, 12, 11, '2014', 11, 'A pop masterpiece', '1989.jpg', 'https://spotify.com/1989'),
-- (1, 'Billie Eilish', 'Black', 'Happier Than Ever', 29, 60, 33, 180, 12, 11, '2021', 11, 'A deep and introspective album', 'happier.jpg', 'https://spotify.com/happier'),
-- (1, 'Drake', 'Gold', 'Scorpion', 32, 85, 33, 180, 12, 13, '2018', 11, 'A hit-packed rap album', 'scorpion.jpg', 'https://spotify.com/scorpion'),
-- (1, 'Post Malone', 'White', 'Hollywood’s Bleeding', 30, 90, 33, 180, 12, 13, '2019', 4, 'A unique blend of rap and rock', 'hollywood.jpg', 'https://spotify.com/hollywood'),
-- (1, 'Poppy', 'White', 'Negative Spaces', 26, 100, 33, 180, 12, 1, '2023', 8, 'Emotional representative of inner feelings and thoughts', 'negativespaces.jpg', 'https://spotify.com/echoes'),
-- (1, 'Dua Lipa', 'Purple', 'Future Nostalgia', 27, 75, 33, 180, 12, 11, '2020', 1, 'A retro-inspired pop album', 'futurenostalgia.jpg', 'https://spotify.com/futurenostalgia'),
-- (1, 'The Weeknd', 'Red', 'After Hours', 29, 85, 33, 180, 12, 14, '2020', 1, 'A cinematic R&B journey', 'afterhours.jpg', 'https://spotify.com/afterhours'),
-- (1, 'Tool', 'Black', 'Fear Inoculum', 35, 50, 33, 180, 12, 8, '2019', 9, 'A progressive metal masterpiece', 'fearinoculum.jpg', 'https://spotify.com/fearinoculum'),
-- (1, 'Three Days Grace', 'Gray', 'One-X', 25, 95, 33, 180, 12, 6, '2006', 6, 'A classic alternative rock album', 'onex.jpg', 'https://spotify.com/onex'),
-- (1, 'Weezer', 'Blue', 'Weezer (Blue Album)', 22, 110, 33, 180, 12, 5, '1994', 5, 'A legendary indie rock debut', 'weezerblue.jpg', 'https://spotify.com/weezerblue'),
-- (1, 'Lorna Shore', 'Black', 'Pain Remains', 30, 40, 33, 180, 12, 9, '2022', 8, 'A brutal deathcore album', 'painremains.jpg', 'https://spotify.com/painremains'),
-- (1, 'The Midnight', 'Purple', 'Endless Summer', 24, 65, 33, 180, 12, 10, '2016', 1, 'A *Endless Summer* a The Midnight 2020-as albuma, amely a 80-as évek szintetizátorokkal, retro hangzású elektronikus poppal és nosztalgikus dallamokkal egyedülálló hangulatot teremt. Az album a nyári szabadság érzését, a fiatalos lendületet és a végtelen naplementéket idézi meg, miközben mélyebb érzelmeket is felszínre hoz, mint a magány, a vágyakozás és a kapcsolatkeresés. Az album a The Midnight jellegzetes stílusát hozza, mely egyesíti a szintipop, az indie rock és a chillwave elemeit. Az *Endless Summer* egy igazi hangulatbombát jelent a nosztalgikus zenekedvelők számára, miközben friss és modern is marad.', 'endlesssummer.jpg', 'https://spotify.com/endlesssummer'),
-- (1, 'Kendrick Lamar', 'Gold', 'To Pimp a Butterfly', 31, 80, 33, 180, 12, 13, '2015', 4, 'A groundbreaking hip-hop album', 'tpab.jpg', 'https://spotify.com/tpab'),
-- (1, 'Daft Punk', 'Silver', 'Random Access Memories', 28, 70, 33, 180, 12, 6, '2013', 5, 'A modern electronic masterpiece', 'ram.jpg', 'https://spotify.com/ram'),
-- (1, 'Arctic Monkeys', 'White', 'AM', 26, 90, 33, 180, 12, 5, '2013', 2, 'A modern indie rock classic', 'am.jpg', 'https://spotify.com/am');

INSERT INTO `vinyls` (`vinyl_amount`, `vinyl_artist`, `vinyl_color`, `vinyl_name`, `price`, `in_stock`, `vinyl_rpm`, `vinyl_weight`, `vinyl_size`, `genre_id`, `vinyl_release`, `label_id`, `vinyl_description`, `image_path`, `spotify_link`) VALUES
(1, 'Bring Me The Horizon', 'Black', 'Sempiternal', 25, 100, 33, 180, 12, 1, '2013', 1, 'A breakthrough album for BMTH, marking their transition from deathcore to a more accessible yet still heavy sound. The album incorporates a variety of influences, blending post-hardcore with electronic elements, resulting in a unique sound that captivated both old fans and new listeners. Songs like "Can You Feel My Heart" and "Sleepwalking" have become anthems for fans worldwide, showcasing the band’s ability to balance melody with aggressive intensity. "Sempiternal" explores themes of mental health, personal struggles, and resilience.', 'sempiternal.jpg', 'https://spotify.com/sempiternal'),
(1, 'Architects', 'Red', 'Holy Hell', 28, 50, 33, 180, 12, 1, '2018', 1, 'This album serves as a tribute to the band’s late guitarist Tom Searle, who passed away from cancer in 2016. "Holy Hell" represents a powerful mix of grief, anger, and emotional release, reflecting Tom’s legacy in the band’s music. The album showcases a shift towards a more melodic yet still heavy sound, combining intricate guitar work with emotional, raw lyrics. Tracks like "Doomsday" and "Hereafter" speak directly to Tom’s influence and the band’s perseverance through their loss.', 'holyhell.jpg', 'https://spotify.com/holyhell'),
(1, 'A Day to Remember', 'Blue', 'Homesick', 22, 75, 33, 180, 12, 1, '2009', 14, 'A blend of pop punk and metalcore, "Homesick" captures the energetic, rebellious spirit of A Day to Remember while expanding their sound with more polished production and catchy hooks. The album includes fan favorites like "The Downfall of Us All" and "If It Means a Lot to You," which exemplify the band’s ability to seamlessly transition between heavy breakdowns and melodic, heartfelt choruses. Lyrically, the album touches on themes of nostalgia, relationships, and the struggles of growing up, resonating deeply with listeners of all ages.', 'homesick.jpg', 'https://spotify.com/homesick'),
(1, 'Paramore', 'Yellow', 'Riot!', 20, 120, 33, 180, 12, 4, '2007', 13, 'Paramore’s "Riot!" is a quintessential pop-punk album, bursting with energy and anthemic choruses. The album catapulted the band into mainstream success, with hits like "Misery Business" and "Crushcrushcrush" becoming staples of the genre. The album’s lyrics reflect the angst and disillusionment of youth, with themes of heartbreak, frustration, and personal growth. Paramore’s ability to balance aggression with vulnerability helped solidify their place as one of the leading bands of the pop-punk era, and "Riot!" remains a defining record of the 2000s alternative scene.', 'riot.jpg', 'https://spotify.com/riot'),
(1, 'Linkin Park', 'Silver', 'Hybrid Theory', 30, 60, 33, 180, 12, 6, '2000', 12, 'As the debut album from Linkin Park, "Hybrid Theory" introduced a new genre fusion of nu-metal, combining rap verses with hard rock choruses, and a heavy emphasis on electronic elements. With tracks like "In the End" and "Crawling," the album explored themes of inner conflict, personal struggle, and frustration, making it relatable to a wide audience. "Hybrid Theory" became a cultural phenomenon, influencing an entire generation and defining the sound of the early 2000s, while its groundbreaking production techniques set the stage for future nu-metal acts.', 'hybridtheory.jpg', 'https://spotify.com/hybridtheory'),
(1, 'Slipknot', 'Gray', 'We Are Not Your Kind', 32, 40, 33, 180, 12, 1, '2019', 1, 'Slipknot’s "We Are Not Your Kind" is a dark, experimental album that pushes the boundaries of metal while maintaining the band’s trademark aggression and intensity. The album blends elements of industrial, electronic, and even avant-garde music, creating a disorienting yet captivating experience. Lyrically, "We Are Not Your Kind" touches on themes of alienation, self-doubt, and personal growth. With tracks like "Unsainted" and "Solway Firth," Slipknot continues to challenge the conventions of heavy music, solidifying their legacy as pioneers of modern metal.', 'wanyk.jpg', 'https://spotify.com/wanyk'),
(1, 'Parkway Drive', 'Gold', 'Reverence', 27, 30, 33, 180, 12, 1, '2018', 1, '"Reverence" by Parkway Drive is a sonic journey through a spectrum of heavy music, ranging from melodic metalcore to atmospheric, symphonic elements. The album explores themes of loss, strength, and resilience, with frontman Winston McCall’s intense vocal delivery guiding the emotional weight of the lyrics. Tracks like "The Void" and "Wishing Wells" showcase the band’s growth in both songwriting and musicality, while maintaining their signature powerful riffs and breakdowns. "Reverence" is an album that mixes melodic beauty with sheer brutality, making it an unforgettable listening experience for metal fans.', 'reverence.jpg', 'https://spotify.com/reverence'),
(1, 'Beartooth', 'Orange', 'Disease', 25, 80, 33, 180, 12, 2, '2018', 1, 'Beartooth’s "Disease" is a raw and unapologetic post-hardcore album that deals with themes of mental illness, self-doubt, and personal redemption. The album balances aggressive, high-energy tracks with introspective moments, exploring the internal struggles that many face in their daily lives. With songs like "In Between" and "Bad Listener," Beartooth tackles issues of isolation and the pressure to conform, while also offering a sense of hope and perseverance. "Disease" is an intense and emotional journey, making it a standout record in the post-hardcore scene.', 'disease.jpg', 'https://spotify.com/disease'),
(1, 'The Amity Affliction', 'Green', 'Let the Ocean Take Me', 22, 90, 33, 180, 12, 2, '2014', 1, 'With "Let the Ocean Take Me," The Amity Affliction blends melodic hardcore with post-hardcore elements to create an album that is both emotional and sonically intense. The album explores themes of heartbreak, mental health, and overcoming adversity, with frontman Joel Birch’s gut-wrenching screams conveying the raw emotion behind the lyrics. Tracks like "Pittsburgh" and "The Weigh Down" dive into the darker side of life, while also offering a sense of catharsis and hope. "Let the Ocean Take Me" is an album that resonates deeply with anyone who has faced personal struggles, making it a defining record in the metalcore genre.', 'ocean.jpg', 'https://spotify.com/ocean'),
(1, 'Ghost', 'White', 'Prequelle', 30, 45, 33, 180, 12, 8, '2018', 9, '"Prequelle" by Ghost is a theatrical and haunting blend of hard rock and heavy metal, drawing on elements of 70s rock, prog, and occult themes. With their signature elaborate imagery and eerie atmosphere, Ghost creates a captivating listening experience that is both eerie and melodic. The album’s lyrical themes center around death, the afterlife, and human frailty, with tracks like "Rats" and "Dance Macabre" combining infectious hooks with dark, haunting imagery. "Prequelle" showcases Ghost’s evolution as a band, solidifying their place as one of the most unique and exciting acts in rock music today.', 'prequelle.jpg', 'https://spotify.com/prequelle'),
(1, 'Taylor Swift', 'Pink', '1989', 28, 70, 33, 180, 12, 11, '2014', 11, 'Taylor Swift’s "1989" is a defining pop album that marked a bold departure from her country roots, embracing a full-on 80s-inspired synth-pop sound. The album is a collection of anthemic songs that combine catchy melodies with deeply personal storytelling. Tracks like "Shake It Off," "Blank Space," and "Style" became massive hits, capturing both the excitement and vulnerability of life and love. With "1989," Taylor Swift reinvented herself as a global pop superstar, creating timeless music that resonates with a wide audience and remains influential in shaping the sound of pop music for years to come.', '1989.jpg', 'https://spotify.com/1989'),
(1, 'Billie Eilish', 'Black', 'Happier Than Ever', 29, 60, 33, 180, 12, 11, '2021', 11, 'Billie Eilish’s "Happier Than Ever" is a strikingly introspective album that explores themes of fame, personal growth, and emotional vulnerability. Known for her haunting vocals and minimalistic production, Eilish brings her signature style to new depths with this record. Tracks like "Your Power" and the title track "Happier Than Ever" showcase her ability to blend dark, atmospheric sounds with deeply personal lyrics. This album is a reflection of Eilish’s journey to reclaim her identity, moving beyond the expectations of the public while grappling with complex emotions, ultimately offering a raw and empowering listening experience.', 'happier.jpg', 'https://spotify.com/happier'),
(1, 'Drake', 'Gold', 'Scorpion', 32, 85, 33, 180, 12, 13, '2018', 11, 'Drake’s "Scorpion" is a double album that highlights his dominance in both rap and R&B, offering a diverse array of tracks ranging from introspective ballads to club bangers. With hits like "God’s Plan" and "In My Feelings," the album explores themes of fame, love, and personal conflict. "Scorpion" also includes moments of vulnerability, with Drake addressing his relationships, fatherhood, and the struggles of being in the public eye. The album solidified Drake’s place as one of the most influential and versatile artists of his generation, with its blend of catchy hooks and reflective lyricism.', 'scorpion.jpg', 'https://spotify.com/scorpion'),
(1, 'Post Malone', 'White', 'Hollywood’s Bleeding', 30, 90, 33, 180, 12, 13, '2019', 4, 'Post Malone’s "Hollywood’s Bleeding" is a unique fusion of rap, rock, and pop that explores themes of fame, loneliness, and self-reflection. The album features hits like "Circles" and "Wow." and blends elements of hip-hop, rock, and country, creating a genre-defying sound that feels both modern and timeless. With his signature blend of melodic vocals and introspective lyricism, Post Malone crafts an album that captures the complexities of living in the spotlight, offering both infectious tunes and raw emotional depth. "Hollywood’s Bleeding" is a testament to Post Malone’s ability to transcend genre boundaries and maintain relevance across multiple musical landscapes.', 'hollywood.jpg', 'https://spotify.com/hollywood'),
(1, 'Poppy', 'White', 'Negative Spaces', 26, 100, 33, 180, 12, 1, '2023', 8, 'Poppy’s "Negative Spaces" is an emotionally charged album that represents a deeply personal exploration of the inner workings of the mind. The record blends elements of metal, electronic, and pop to create an intensely atmospheric soundscape. With tracks like "Vigil" and "Living Inside a Dream," Poppy delves into themes of self-doubt, existentialism, and the complex emotions tied to personal identity. The album’s haunting melodies and dark, introspective lyrics resonate deeply with listeners, offering both an intimate portrayal of Poppy’s inner world and a powerful statement of artistic evolution.', 'negativespaces.jpg', 'https://spotify.com/echoes'),
(1, 'Dua Lipa', 'Purple', 'Future Nostalgia', 27, 75, 33, 180, 12, 11, '2020', 1, 'Dua Lipa’s "Future Nostalgia" is a retro-inspired pop album that blends modern production with a vintage 80s sound, creating a euphoric and danceable experience from start to finish. With singles like "Don’t Start Now" and "Physical," the album explores themes of empowerment, independence, and self-expression. Dua Lipa’s infectious energy and confident delivery shine throughout the record, making it one of the standout pop albums of the 2020s. "Future Nostalgia" not only showcases her impressive vocal range but also highlights her ability to craft songs that are both timeless and contemporary, perfect for both nostalgic and new listeners alike.', 'futurenostalgia.jpg', 'https://spotify.com/futurenostalgia'),
(1, 'The Weeknd', 'Red', 'After Hours', 29, 85, 33, 180, 12, 14, '2020', 1, 'The Weeknd’s "After Hours" is a cinematic and atmospheric journey through the world of R&B, synth-pop, and electronic music. The album features the smash hit "Blinding Lights" and explores themes of love, loss, and the darker sides of fame. The Weeknd’s haunting vocals and dramatic production create a sense of emotional depth, while tracks like "Heartless" and "Save Your Tears" showcase his ability to balance vulnerability with a sense of isolation. "After Hours" is both a reflection of his past and a step forward in his musical evolution, creating an immersive and unforgettable listening experience.', 'afterhours.jpg', 'https://spotify.com/afterhours'),
(1, 'Tool', 'Black', 'Fear Inoculum', 35, 50, 33, 180, 12, 8, '2019', 9, 'Tool’s "Fear Inoculum" is a progressive metal masterpiece that builds on the band’s signature sound while introducing new elements of complexity and depth. The album is a long, immersive experience, with tracks like "Pneuma" and "Invincible" exploring themes of spirituality, human consciousness, and existentialism. The intricate musicianship and thought-provoking lyrics make "Fear Inoculum" a rewarding listen for fans of both heavy and progressive music. It’s an album that demands attention and multiple listens to fully appreciate its richness, reinforcing Tool’s reputation as one of the most innovative and influential bands in metal.', 'fearinoculum.jpg', 'https://spotify.com/fearinoculum'),
(1, 'Three Days Grace', 'Gray', 'One-X', 25, 95, 33, 180, 12, 6, '2006', 6, 'Three Days Grace’s "One-X" is a classic alternative rock album that deals with themes of pain, addiction, and personal transformation. With tracks like "Animal I Have Become" and "Pain," the album resonates with anyone who has struggled with their inner demons or faced overwhelming obstacles. The raw emotion conveyed through the band’s powerful performances and gritty instrumentation creates a cathartic experience for listeners. "One-X" is a deeply personal and intense record that captures the essence of emotional struggle and the desire for change, solidifying Three Days Grace’s place as one of the leaders in modern rock.', 'onex.jpg', 'https://spotify.com/onex'),
(1, 'Weezer', 'Blue', 'Weezer (Blue Album)', 22, 110, 33, 180, 12, 5, '1994', 5, 'Weezer’s self-titled debut album, often referred to as the "Blue Album," is a seminal release in the indie rock and alternative rock scenes. The album’s quirky, emotionally charged lyrics and infectious melodies helped define the sound of 90s rock, with tracks like "Buddy Holly" and "Say It Ain’t So" becoming instant classics. With its mix of raw emotion, guitar-driven hooks, and witty lyrics, the album captures the feeling of youthful angst and rebellion, making it a defining record for Generation X and beyond. "Weezer" remains one of the most influential albums in alternative rock history.', 'weezerblue.jpg', 'https://spotify.com/weezerblue'),
(1, 'Lorna Shore', 'Black', 'Pain Remains', 30, 40, 33, 180, 12, 9, '2022', 8, 'Lorna Shore’s "Pain Remains" is a brutal deathcore album that combines ferocious guitar riffs, thunderous drumming, and guttural vocals to create an intense listening experience. The album’s themes of grief, loss, and personal struggle are explored through its dark, heavy sound and anguished lyrics. Songs like "Cursed to Die" and "Pain Remains" showcase the band’s ability to combine sheer brutality with intricate musicianship. "Pain Remains" is not for the faint of heart, but for fans of extreme metal, it’s a powerful and emotionally charged record that showcases Lorna Shore’s incredible musical prowess.', 'painremains.jpg', 'https://spotify.com/painremains'),
(1, 'The Midnight', 'Purple', 'Endless Summer', 24, 65, 33, 180, 12, 10, '2016', 1, 'The Midnight’s "Endless Summer" is a retro-inspired electronic pop album that evokes a sense of nostalgia for the golden era of the 80s. With lush synths, catchy melodies, and lyrics that touch on love, youth, and longing, the album transports listeners to a time of endless possibilities. The album blends elements of synthpop, chillwave, and indie rock to create a sound that is both nostalgic and fresh. The Midnight captures the essence of summer—carefree, passionate, and unforgettable—while also exploring deeper emotions such as loneliness and yearning, making it an album that resonates on both an emotional and musical level.', 'endlesssummer.jpg', 'https://spotify.com/endlesssummer'),
(1, 'Kendrick Lamar', 'Gold', 'To Pimp a Butterfly', 31, 80, 33, 180, 12, 13, '2015', 4, 'Kendrick Lamar’s "To Pimp a Butterfly" is a groundbreaking hip-hop album that blends jazz, funk, soul, and rap to create a genre-defying masterpiece. The album is a bold commentary on race, identity, and social justice, with tracks like "Alright" and "King Kunta" becoming anthems for the Black Lives Matter movement. The album’s complex production and deeply introspective lyrics make it one of the most important and influential records of the 21st century. "To Pimp a Butterfly" is a fearless exploration of culture, power, and personal growth, showcasing Kendrick Lamar’s unmatched lyrical genius and artistic vision.', 'tpab.jpg', 'https://spotify.com/tpab'),
(1, 'Daft Punk', 'Silver', 'Random Access Memories', 28, 70, 33, 180, 12, 6, '2013', 5, 'Daft Punk’s "Random Access Memories" is a modern electronic masterpiece that blends disco, funk, and house with a futuristic vision of music. The album’s retro-inspired sound is complemented by its use of live instruments and collaboration with artists like Pharrell Williams and Nile Rodgers. Tracks like "Get Lucky" and "Lose Yourself to Dance" became global hits, offering an upbeat and infectious groove. The album also explores deeper themes, including the relationship between humanity and technology, making it not only a musical triumph but also a philosophical statement about the future of music. "Random Access Memories" is a groundbreaking record that changed the landscape of electronic music.', 'ram.jpg', 'https://spotify.com/ram'),
(1, 'Arctic Monkeys', 'White', 'AM', 26, 90, 33, 180, 12, 5, '2013', 2, 'Arctic Monkeys’ "AM" is a modern indie rock classic that blends hip-hop rhythms with rock sensibilities, creating a unique and captivating sound. With tracks like "Do I Wanna Know?" and "R U Mine?", the album explores themes of desire, lust, and the complexities of modern relationships. The band’s slick guitar riffs and Alex Turner’s smooth vocals are complemented by the album’s dark, moody atmosphere, making "AM" a defining record of the 2010s indie rock scene. The album’s innovative production and infectious hooks make it a standout in Arctic Monkeys’ discography and a must-listen for rock fans.', 'am.jpg', 'https://spotify.com/am');
