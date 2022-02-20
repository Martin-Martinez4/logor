BEGIN TRANSACTION;
 
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#users') 
 WHERE comment_id = '83e825de-21f8-41e8-906f-6d28faa4ca11';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#action-items') 
 WHERE comment_id = '899bdfa4-d759-4abe-bc58-f4c7fb3a8103';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#supply-chains') 
 WHERE comment_id = '4ebf596f-1c9a-49bd-bd15-a3be0bb405df';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#action-items') 
 WHERE comment_id = '541398f3-e6be-43b5-9447-236b3c17a035';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#portals') 
 WHERE comment_id = 'f21f83ca-fc9d-4fa3-b2ca-0b581fe0637f';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#supply-chains') 
 WHERE comment_id = '0371fcb7-7602-49d5-9851-efe02fb2437c';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#solutions') 
 WHERE comment_id = '5905ebc5-cfe9-40fc-a3cb-a6caffbe5840';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#portals') 
 WHERE comment_id = '368dc9fe-5316-43b0-8cc6-9921e32bc58c';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#portals') 
 WHERE comment_id = '9f0d55ad-5eb2-4ba8-9eae-c5a70e68cd22';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#portals') 
 WHERE comment_id = 'b29f6f46-54af-4231-adfd-7a4b7014777f';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#portals') 
 WHERE comment_id = 'fe99b125-cf25-4185-9051-7c0c68364381';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#e-markets') 
 WHERE comment_id = '664a8782-8ee4-4da6-a40b-7ba4a639daaf';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#solutions') 
 WHERE comment_id = '21d0b8a6-4ab5-4b41-92da-6b4ded4e9e97';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#portals') 
 WHERE comment_id = '67745e3e-3da2-4635-8bcc-dd846f63d6da';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#ROI') 
 WHERE comment_id = '57eeff68-33d9-453a-baec-6da40ba25328';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#users') 
 WHERE comment_id = '457737de-063d-4cac-9588-cce881908d9d';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#models') 
 WHERE comment_id = '7889df43-7c9b-4152-bd83-87eb74b33424';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#portals') 
 WHERE comment_id = '0fe50338-887c-466f-829d-3da76dcac00c';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#action-items') 
 WHERE comment_id = '4c9b930a-c827-4da1-8b83-c09ca1db36ec';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#users') 
 WHERE comment_id = '1a2bb1f5-cced-47cc-b147-0c4963b530f7';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#portals') 
 WHERE comment_id = '68083245-5318-4a85-bfbb-8a7c7febfec9';
 UPDATE comments 
 SET text_content = CONCAT(text_content,'#ROI') 
 WHERE comment_id = 'fa786cf9-22ba-403e-bf64-63f5bd5a44c7';
 COMMIT;