
DROP DATABASE logor1;
CREATE DATABASE logor1;
\c logor1;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Deploy fresh database tabels:
\i './database/tables/users.sql'
\i './database/tables/comments.sql'


\i './database/seed/users.sql'
\i './database/seed/headers.sql'
\i './database/seed/login.sql'
\i './database/seed/tags.sql'
\i './database/seed/comments.sql'
\i './database/seed/tag_comment.sql'
\i './database/seed/updateComment.sql'
-- \i '/docker-entrypoint-initdb.d/seed/seed.sql'
-- For testing purposes only. This file will add dummy data


