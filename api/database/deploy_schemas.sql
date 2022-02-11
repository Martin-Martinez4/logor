
DROP DATABASE logor1;
CREATE DATABASE logor1;
\c logor1;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Deploy fresh database tabels:
\i './database/tables/users.sql'
\i './database/tables/login.sql'

-- For testing purposes only. This file will add dummy data
-- \i '/docker-entrypoint-initdb.d/seed/seed.sql'


