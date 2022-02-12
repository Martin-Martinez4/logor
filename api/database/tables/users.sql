BEGIN TRANSACTION;

CREATE TABLE users (

    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    username VARCHAR(50) NOT NULL,
    nick_name VARCHAR(50) NOT NULL ,
    profile_pic_url VARCHAR(300) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_headers(

    description VARCHAR(920),
    header_img_url VARCHAR(300),
    location VARCHAR(100),
    links VARCHAR(600),
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

CREATE TABLE follower_followee(

    follower_id UUID NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES users(id),

    followee_id UUID NOT NULL,
    FOREIGN KEY (followee_id) REFERENCES users(id),

    PRIMARY KEY (follower_id, followee_id)

);


COMMIT;


