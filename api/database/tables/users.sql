BEGIN TRANSACTION;

CREATE TABLE users (

    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    username VARCHAR(30) NOT NULL,
    tag VARCHAR(30) NOT NULL ,
    PRIMARY KEY (id),
    profile_pic_url VARCHAR(30) NOT NULL 
);

CREATE TABLE user_headers(

    description VARCHAR(920),
    header_img_url VARCHAR(30),
    location VARCHAR(100),
    links VARCHAR(500),
    joined_date DATE,
    user_id UUID,
    FOREIGN KEY(user_id) REFERENCES users(id)

);


CREATE TABLE login(

    username VARCHAR(30) NOT NULL ,
    password VARCHAR(30) NOT NULL,
    user_id UUID,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

COMMIT;


