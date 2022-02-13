
-- INSERT INTO users (username, created_at) VALUES ('Kenton_Kirlin', '2017-02-16 18:22:10.846'), ('Andre_Purdy85', '2017-04-02 17:11:21.417'), ('Harley_Lind18', '2017-02-21 11:12:32.574');

--  insert uuids as '292a485f-a56a-4938-8f1a-bbbbbbbbbbb1'::UUID,


INSERT INTO users(id, username, nick_name, profile_pic_url) 
VALUES 
( 'c946c269-5bba-4401-9825-804a5f604698', 'Reginald55',  'bluetooth-cow', '../../users/default/Monkey_2.svg'),
( '9b4ce7b2-ac3b-492d-8536-6894f9b67a72', 'Eloise_Moore15',  'back-end-bear', '../../users/default/Monkey_2.svg'),
( 'f241dd2b-bdfc-4cff-80db-c699c1af4579', 'Opal_Walker99',  'solid state-crocodilia', '../../users/default/Monkey_2.svg'),
( 'ef863a59-d73f-40b1-9d4c-2fbb6a54ef8c', 'Marcelina26',  'cross-platform-horse', '../../users/default/Monkey_2.svg'),
( '6e9c697a-50bf-4210-92e8-65cc49a28935', 'Golden_Goyette62',  'multi-byte-crocodilia', '../../users/default/Monkey_2.svg'),
( '1510bc3c-dcdc-43b4-9e0d-5fc4755d00d1', 'Elmira55',  'wireless-crocodilia', '../../users/default/Monkey_2.svg'),
( '629e4c8e-1776-4724-835b-5675348de14d', 'Jeremie_Jenkins97',  'redundant-cetacean', '../../users/default/Monkey_2.svg'),
( '63bf2be8-8a8d-4f94-b0ba-7300d979eb32', 'Axel.Cruickshank',  'neural-cow', '../../users/default/Monkey_2.svg'),
( '05192e38-b095-40ab-8e45-70e88b9db6d5', 'Zackery_Kautzer54',  'online-cetacean', '../../users/default/Monkey_2.svg'),
( '7fe39c64-8efc-4505-a099-3fa903bd5391', 'Amara_Lesch81',  'cross-platform-snake', '../../users/default/Monkey_2.svg');

INSERT INTO user_headers( description, header_img_url, location, links, joined_date, user_id) 
VALUES 
('synthesize bluetooth panel Self-enabling interactive service-desk incubate frictionless paradigms', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Anderson', 'http://mable.net', '2022-02-13 02:06:15', 'c946c269-5bba-4401-9825-804a5f604698'),
('bypass mobile capacitor Horizontal zero defect portal deliver viral e-services', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'El Cajon', 'http://ramiro.info', '2022-02-13 02:06:15', '9b4ce7b2-ac3b-492d-8536-6894f9b67a72'),
('compress 1080p monitor Distributed optimizing task-force transition vertical convergence', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Elgin', 'https://beth.name', '2022-02-13 02:06:15', 'f241dd2b-bdfc-4cff-80db-c699c1af4579'),
('synthesize bluetooth protocol Integrated actuating complexity embrace bricks-and-clicks e-tailers', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Lake Havasu City', 'https://tabitha.biz', '2022-02-13 02:06:15', 'ef863a59-d73f-40b1-9d4c-2fbb6a54ef8c'),
('bypass mobile bus Innovative mission-critical challenge monetize extensible niches', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Elk Grove', 'https://khalil.name', '2022-02-13 02:06:15', '6e9c697a-50bf-4210-92e8-65cc49a28935'),
('quantify bluetooth transmitter Devolved high-level productivity utilize e-business solutions', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'San Buenaventura (Ventura)', 'http://jammie.name', '2022-02-13 02:06:15', '1510bc3c-dcdc-43b4-9e0d-5fc4755d00d1'),
('program primary port Optimized uniform Graphical User Interface visualize e-business functionalities', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'San Buenaventura (Ventura)', 'http://thea.net', '2022-02-13 02:06:15', '629e4c8e-1776-4724-835b-5675348de14d'),
('synthesize bluetooth capacitor Down-sized asymmetric standardization empower distributed niches', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Euclid', 'https://clotilde.org', '2022-02-13 02:06:15', '63bf2be8-8a8d-4f94-b0ba-7300d979eb32'),
('generate primary pixel Intuitive needs-based service-desk innovate B2B schemas', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Garden Grove', 'https://adrian.name', '2022-02-13 02:06:15', '05192e38-b095-40ab-8e45-70e88b9db6d5'),
('copy redundant card Multi-tiered coherent contingency innovate viral web services', '../../users/1/unsplash_GBEHjsPQbEQ.png', 'Hialeah', 'http://kraig.net', '2022-02-13 02:06:15', '7fe39c64-8efc-4505-a099-3fa903bd5391');

INSERT INTO login( username, password, user_id) 
VALUES 
('Reginald55', 'password', 'c946c269-5bba-4401-9825-804a5f604698'),
('Opal_Walker99', 'password', 'f241dd2b-bdfc-4cff-80db-c699c1af4579'),
('Eloise_Moore15', 'password', '9b4ce7b2-ac3b-492d-8536-6894f9b67a72'),
('Marcelina26', 'password', 'ef863a59-d73f-40b1-9d4c-2fbb6a54ef8c'),
('Golden_Goyette62', 'password', '6e9c697a-50bf-4210-92e8-65cc49a28935'),
('Elmira55', 'password', '1510bc3c-dcdc-43b4-9e0d-5fc4755d00d1'),
('Jeremie_Jenkins97', 'password', '629e4c8e-1776-4724-835b-5675348de14d'),
('Axel.Cruickshank', 'password', '63bf2be8-8a8d-4f94-b0ba-7300d979eb32'),
('Zackery_Kautzer54', 'password', '05192e38-b095-40ab-8e45-70e88b9db6d5'),
('Amara_Lesch81', 'password', '7fe39c64-8efc-4505-a099-3fa903bd5391');

INSERT INTO tags( tag_id, tag_name)
VALUES 
( '7289b064-a0d8-47ee-8d1b-070158ff8863', '#webServices'),
 ( '5600245a-4d3f-4766-8d4a-bd8802a6d1b1', '#relationships'),
 ( '76a5bf61-23c9-4e22-a964-b53b2d01625d', '#architectures'),
 ( '28d8d3b7-6516-4c05-891e-f73e3430a2a0', '#systems'),
 ( '18258e5a-5f42-441d-8674-39dfb72e278d', '#e-tailers'),
 ( '5ec8a02d-d441-4f52-93f7-29c82c2e5842', '#architectures'),
 ( '801e0e44-4e9d-49b5-a70b-8a22b2e0b1c5', '#deliverables'),
 ( '89ad7e2b-82e4-4c84-a76e-a0bbcf862882', '#interfaces'),
 ( '117e15b5-2f06-4883-b3bf-969e8a4dcc7b', '#convergence'),
 ( 'ea2406ff-78a9-48bc-b8fa-06dc47f0c387', '#ROI');

INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id ) 
VALUES 
('feef413f-3487-4d3a-afc3-b63c7e9491af', 'The Football Is Good For Training And Recreational Purposes Intuitive national ability',  '2021-09-07 15:49:41', '{'', ''}', 0, 'c946c269-5bba-4401-9825-804a5f604698'),
('1ee66dea-e887-40b4-862c-f6691eb00c14', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart Distributed neutral monitoring',  '2021-08-29 23:40:50', '{'', ''}', 0, 'c946c269-5bba-4401-9825-804a5f604698'),
('3ec37a05-4168-42a3-a396-91c1edafd8b6', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016 Digitized directional extranet',  '2021-04-15 20:40:16', '{'', ''}', 0, 'f241dd2b-bdfc-4cff-80db-c699c1af4579'),
('6530c5f8-7578-4905-89b2-5fc4d3a967b5', 'Boston''s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles Synchronised coherent task-force',  '2021-09-23 14:16:50', '{'', ''}', 0, '9b4ce7b2-ac3b-492d-8536-6894f9b67a72'),
('ecbd530c-6940-4ef1-abf6-6985ee51cd87', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J Advanced maximized adapter',  '2021-10-10 14:33:51', '{'', ''}', 0, '9b4ce7b2-ac3b-492d-8536-6894f9b67a72'),
('01e63418-c325-42fc-b322-01afcecc15a7', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart Horizontal grid-enabled collaboration',  '2021-02-16 10:21:59', '{'', ''}', 0, 'ef863a59-d73f-40b1-9d4c-2fbb6a54ef8c'),
('c45a9bac-7842-407d-822a-9b9cac9ab18c', 'The Football Is Good For Training And Recreational Purposes Ameliorated scalable projection',  '2021-03-29 18:50:00', '{'', ''}', 0, '6e9c697a-50bf-4210-92e8-65cc49a28935'),
('1f6f29fe-2663-4256-bcc9-620ce003b973', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals Distributed grid-enabled task-force',  '2021-07-11 08:23:03', '{'', ''}', 0, 'f241dd2b-bdfc-4cff-80db-c699c1af4579'),
('fdef2333-8602-4e2b-8559-18d08ed7140f', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality Persistent methodical throughput',  '2021-03-24 23:32:41', '{'', ''}', 0, '1510bc3c-dcdc-43b4-9e0d-5fc4755d00d1'),
('7c0d233b-bf52-4f0e-ae0a-602bc7bed724', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart Programmable regional artificial intelligence',  '2021-03-24 19:15:10', '{'', ''}', 0, '1510bc3c-dcdc-43b4-9e0d-5fc4755d00d1'),
('655b4e41-6a96-47a0-a9f9-2b657052b772', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support Cloned upward-trending moderator',  '2021-06-06 08:36:16', '{'', ''}', 0, 'ef863a59-d73f-40b1-9d4c-2fbb6a54ef8c'),
('85510391-aec5-4ffd-b78e-183e3358bc2b', 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design Open-source coherent challenge',  '2021-06-27 00:38:36', '{'', ''}', 0, '629e4c8e-1776-4724-835b-5675348de14d'),
('c0542b02-8079-4cd3-91b2-cd98f457e164', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals Phased dynamic definition',  '2021-09-26 11:05:57', '{'', ''}', 0, '6e9c697a-50bf-4210-92e8-65cc49a28935'),
('d66cf078-3e65-470d-924c-f7ea2f74b6c5', 'Boston''s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles Centralized dedicated time-frame',  '2021-08-19 05:30:43', '{'', ''}', 0, '63bf2be8-8a8d-4f94-b0ba-7300d979eb32'),
('21632091-f689-49c3-9e9a-0c124f56b2f0', 'Boston''s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles Operative systemic artificial intelligence',  '2021-07-05 17:48:58', '{'', ''}', 0, '629e4c8e-1776-4724-835b-5675348de14d'),
('ba97bf66-da9a-479a-a086-ca7288fc7db7', 'Boston''s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles Up-sized content-based model',  '2022-02-10 03:37:22', '{'', ''}', 0, '63bf2be8-8a8d-4f94-b0ba-7300d979eb32'),
('743f5aa5-6d72-420c-ba15-ed2297753eb7', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals Implemented interactive extranet',  '2021-10-30 00:48:38', '{'', ''}', 0, '05192e38-b095-40ab-8e45-70e88b9db6d5'),
('abe1b3e0-9f99-4b29-9ba5-da8311589011', 'Boston''s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles Total encompassing function',  '2021-09-06 02:29:51', '{'', ''}', 0, '05192e38-b095-40ab-8e45-70e88b9db6d5');

-- UPDATE comments
-- SET text_content = ${test + tags}
-- WHERE comment_id = ${comment_id};

 UPDATE comments 
 SET text_content = CONCAT(text_content,' #architectures') 
 WHERE comment_id = 'feef413f-3487-4d3a-afc3-b63c7e9491af';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #deliverables') 
 WHERE comment_id = '6530c5f8-7578-4905-89b2-5fc4d3a967b5';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #architectures') 
 WHERE comment_id = 'ecbd530c-6940-4ef1-abf6-6985ee51cd87';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #architectures') 
 WHERE comment_id = '3ec37a05-4168-42a3-a396-91c1edafd8b6';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #e-tailers') 
 WHERE comment_id = '1ee66dea-e887-40b4-862c-f6691eb00c14';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #webServices') 
 WHERE comment_id = '01e63418-c325-42fc-b322-01afcecc15a7';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #web services') 
 WHERE comment_id = '655b4e41-6a96-47a0-a9f9-2b657052b772';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #ROI') 
 WHERE comment_id = '1f6f29fe-2663-4256-bcc9-620ce003b973';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #convergence') 
 WHERE comment_id = 'c45a9bac-7842-407d-822a-9b9cac9ab18c';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #architectures') 
 WHERE comment_id = 'c0542b02-8079-4cd3-91b2-cd98f457e164';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #architectures') 
 WHERE comment_id = 'fdef2333-8602-4e2b-8559-18d08ed7140f';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #architectures') 
 WHERE comment_id = '7c0d233b-bf52-4f0e-ae0a-602bc7bed724';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #webServices') 
 WHERE comment_id = '85510391-aec5-4ffd-b78e-183e3358bc2b';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #architectures') 
 WHERE comment_id = 'd66cf078-3e65-470d-924c-f7ea2f74b6c5';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #systems') 
 WHERE comment_id = '21632091-f689-49c3-9e9a-0c124f56b2f0';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #webServices') 
 WHERE comment_id = 'abe1b3e0-9f99-4b29-9ba5-da8311589011';
 UPDATE comments 
 SET text_content = CONCAT(text_content,' #architectures') 
 WHERE comment_id = 'ba97bf66-da9a-479a-a086-ca7288fc7db7';

INSERT INTO tag_comment( tag_id, comment_id ) 
VALUES 
 ('76a5bf61-23c9-4e22-a964-b53b2d01625d', 'feef413f-3487-4d3a-afc3-b63c7e9491af'),
 ('18258e5a-5f42-441d-8674-39dfb72e278d', '1ee66dea-e887-40b4-862c-f6691eb00c14'),
 ('801e0e44-4e9d-49b5-a70b-8a22b2e0b1c5', '6530c5f8-7578-4905-89b2-5fc4d3a967b5'),
 ('76a5bf61-23c9-4e22-a964-b53b2d01625d', 'ecbd530c-6940-4ef1-abf6-6985ee51cd87'),
 ('5ec8a02d-d441-4f52-93f7-29c82c2e5842', '3ec37a05-4168-42a3-a396-91c1edafd8b6'),
 ('ea2406ff-78a9-48bc-b8fa-06dc47f0c387', '1f6f29fe-2663-4256-bcc9-620ce003b973'),
 ('7289b064-a0d8-47ee-8d1b-070158ff8863', '01e63418-c325-42fc-b322-01afcecc15a7'),
 ('7289b064-a0d8-47ee-8d1b-070158ff8863', '655b4e41-6a96-47a0-a9f9-2b657052b772'),
 ('117e15b5-2f06-4883-b3bf-969e8a4dcc7b', 'c45a9bac-7842-407d-822a-9b9cac9ab18c'),
 ('5ec8a02d-d441-4f52-93f7-29c82c2e5842', 'c0542b02-8079-4cd3-91b2-cd98f457e164'),
 ('5ec8a02d-d441-4f52-93f7-29c82c2e5842', 'fdef2333-8602-4e2b-8559-18d08ed7140f'),
 ('76a5bf61-23c9-4e22-a964-b53b2d01625d', '7c0d233b-bf52-4f0e-ae0a-602bc7bed724'),
 ('7289b064-a0d8-47ee-8d1b-070158ff8863', '85510391-aec5-4ffd-b78e-183e3358bc2b'),
 ('28d8d3b7-6516-4c05-891e-f73e3430a2a0', '21632091-f689-49c3-9e9a-0c124f56b2f0'),
 ('5ec8a02d-d441-4f52-93f7-29c82c2e5842', 'd66cf078-3e65-470d-924c-f7ea2f74b6c5'),
 ('76a5bf61-23c9-4e22-a964-b53b2d01625d', 'ba97bf66-da9a-479a-a086-ca7288fc7db7'),
 ('7289b064-a0d8-47ee-8d1b-070158ff8863', 'abe1b3e0-9f99-4b29-9ba5-da8311589011');


-- INSERT INTO follower_followee( follower_id, followee_id ) VALUES

-- INSERT INTO user_likes(user_id, comment_id ) VALUES



