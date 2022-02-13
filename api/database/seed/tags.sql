BEGIN TRANSACTION;
 INSERT INTO tags( tag_id, tag_name)
VALUES
('f1f30cd5-28e5-4e54-822a-4c0b1643ea72', '#networks'), 
('4f55f7d0-f11e-43c3-8cf6-e4f93ad87ec0', '#synergies'), 
('38cdb488-ba1a-4cd1-8d75-77aa1280f47f', '#infrastructures'), 
('062cb695-340b-465d-a6d3-d9634fe14af2', '#infomediaries'), 
('37448d68-3a36-4c37-9981-575005d616cb', '#supply-chains'), 
('daaec714-ff75-4e51-8d83-0edf41068b64', '#mindshare'), 
('c1af6f9b-5946-4844-a5bf-011f16296779', '#systems'), 
('94a7f03d-3011-4333-ada5-d9eb7bb4132d', '#partnerships'), 
('f7182462-654d-48f8-9c0b-a9d83af7066c', '#communities'), 
('399cf775-14aa-4342-9ca2-6b43a0589e29', '#experiences'); 

 COMMIT;