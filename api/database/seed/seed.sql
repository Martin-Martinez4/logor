
-- INSERT INTO users (username, created_at) VALUES ('Kenton_Kirlin', '2017-02-16 18:22:10.846'), ('Andre_Purdy85', '2017-04-02 17:11:21.417'), ('Harley_Lind18', '2017-02-21 11:12:32.574');

--  insert uuids as '292a485f-a56a-4938-8f1a-bbbbbbbbbbb1'::UUID,


INSERT INTO users(id, username, nick_name, profile_pic_url) 
VALUES 
( '2a616772-76f3-4613-b3e8-6ef67f4a1189', 'Antonia.Sipes',  'solid state-cetacean', '../../users/default/Monkey_2.svg'),
( '57dcfef6-b7c6-4f0a-94da-f6d319855895', 'Cayla_Rau88',  'digital-dog', '../../users/default/Monkey_2.svg'),
( '741035a1-3505-44de-8a2e-075d8b395695', 'Myrl.Hickle',  'redundant-crocodilia', '../../users/default/Monkey_2.svg'),
( 'bcb68385-9ede-4947-9080-c5e255f5937a', 'Vernon.Larkin',  '1080p-cat', '../../users/default/Monkey_2.svg'),
( '62175a00-5aed-4c7c-9259-b077a45d7fb9', 'Charlie_Hilpert92',  'back-end-horse', '../../users/default/Monkey_2.svg'),
( '893524e5-a4bd-4e55-ba4c-5e7afe685c06', 'Tracey_Kulas',  'multi-byte-bird', '../../users/default/Monkey_2.svg'),
( 'cf2dacf1-309d-483e-ac3d-2e5bafba0f6b', 'Bertrand65',  'mobile-cetacean', '../../users/default/Monkey_2.svg'),
( 'ba83595c-340f-4149-be5f-89e914a501d9', 'Sedrick94',  'haptic-snake', '../../users/default/Monkey_2.svg'),
( '158bfb62-6697-4543-a441-4ffb5dfdc530', 'Treva23',  'neural-bear', '../../users/default/Monkey_2.svg'),
( '0053bc9a-4679-4172-aa06-e09a76f3ace3', 'Sheldon47',  'mobile-horse', '../../users/default/Monkey_2.svg');

INSERT INTO user_headers( description, header_img_url, location, links, joined_date, user_id) 
VALUES 
('override neural panel Horizontal composite migration utilize synergistic experiences', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Meriden', 'http://karelle.biz', '2022-02-12 22:05:48', '2a616772-76f3-4613-b3e8-6ef67f4a1189'),
('quantify primary interface Integrated system-worthy budgetary management visualize enterprise markets', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Aloha', 'https://jamie.info', '2022-02-12 22:05:48', '57dcfef6-b7c6-4f0a-94da-f6d319855895'),
('synthesize optical monitor User-friendly transitional monitoring generate real-time e-commerce', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Malden', 'https://madelynn.com', '2022-02-12 22:05:48', '741035a1-3505-44de-8a2e-075d8b395695'),
('parse wireless panel Re-contextualized global adapter generate virtual ROI', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Bethlehem', 'http://floyd.name', '2022-02-12 22:05:48', 'bcb68385-9ede-4947-9080-c5e255f5937a'),
('index wireless panel Triple-buffered contextually-based pricing structure architect transparent convergence', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Germantown', 'https://matt.net', '2022-02-12 22:05:48', '62175a00-5aed-4c7c-9259-b077a45d7fb9'),
('connect multi-byte monitor Versatile encompassing info-mediaries transition granular users', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Lakewood', 'http://letha.info', '2022-02-12 22:05:48', '893524e5-a4bd-4e55-ba4c-5e7afe685c06'),
('reboot haptic port Inverse asynchronous standardization seize end-to-end action-items', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Santee', 'https://eloise.net', '2022-02-12 22:05:48', 'cf2dacf1-309d-483e-ac3d-2e5bafba0f6b'),
('calculate multi-byte array Organic systemic forecast benchmark 24/7 e-commerce', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Bozeman', 'https://corine.info', '2022-02-12 22:05:48', 'ba83595c-340f-4149-be5f-89e914a501d9'),
('reboot digital bus Inverse client-server matrices synthesize wireless web services', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Brentwood', 'https://mauricio.info', '2022-02-12 22:05:48', '158bfb62-6697-4543-a441-4ffb5dfdc530'),
('bypass virtual alarm Devolved context-sensitive implementation matrix wireless portals', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'North Miami', 'http://ephraim.com', '2022-02-12 22:05:48', '0053bc9a-4679-4172-aa06-e09a76f3ace3');

INSERT INTO login( username, password, user_id) 
VALUES 
('Antonia.Sipes', 'password', '2a616772-76f3-4613-b3e8-6ef67f4a1189'),
('Cayla_Rau88', 'password', '57dcfef6-b7c6-4f0a-94da-f6d319855895'),
('Myrl.Hickle', 'password', '741035a1-3505-44de-8a2e-075d8b395695'),
('Vernon.Larkin', 'password', 'bcb68385-9ede-4947-9080-c5e255f5937a'),
('Charlie_Hilpert92', 'password', '62175a00-5aed-4c7c-9259-b077a45d7fb9'),
('Tracey_Kulas', 'password', '893524e5-a4bd-4e55-ba4c-5e7afe685c06'),
('Bertrand65', 'password', 'cf2dacf1-309d-483e-ac3d-2e5bafba0f6b'),
('Sedrick94', 'password', 'ba83595c-340f-4149-be5f-89e914a501d9'),
('Treva23', 'password', '158bfb62-6697-4543-a441-4ffb5dfdc530'),
('Sheldon47', 'password', '0053bc9a-4679-4172-aa06-e09a76f3ace3');

-- INSERT INTO follower_followee( follower_id, followee_id ) VALUES


-- INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id ) VALUES ('0470cdfc-5912-40bc-a2eb-f328d36bb3f5', 'test text', '1422169200000', '{'0', ''}', 0, '206347a2-dbad-4dcd-a352-d0916bf85659'::UUID)

-- INSERT INTO tags( tag_id, tag_name) VALUES

-- INSERT INTO tag_comment( tag_id, comment_id ) VALUES

-- INSERT INTO user_likes(user_id, comment_id ) VALUES



