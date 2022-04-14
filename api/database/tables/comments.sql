
BEGIN TRANSACTION;

CREATE TABLE comments(
    comment_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    text_content VARCHAR(920),
    created_at TIMESTAMPTZ NOT NULL,
    status  TEXT [],
    likes INT,
    PRIMARY KEY(comment_id),
    user_id UUID NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE tags(
    tag_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    tag_name VARCHAR(30) UNIQUE,
    PRIMARY KEY (tag_id)
);

CREATE TABLE tag_comment(

    tag_id UUID NOT NULL,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
    comment_id UUID NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id),
    PRIMARY KEY(tag_id, comment_id)

);

CREATE TABLE user_likes(

    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    comment_id UUID NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id),
    PRIMARY KEY (user_id, comment_id)
);

CREATE TABLE mentions(

    user_id UUID NOT NUll,
    FOREIGN Key (user_id) REFERENCES users(id),

    comment_id UUID NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id),

    seen BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (user_id, comment_id)
);

CREATE TABLE responses(

    parent_id UUID DEFAULT NULL,
    FOREIGN KEY(parent_id) REFERENCES comments(comment_id),

    comment_id UUID NOT NULL,
    FOREIGN KEY(comment_id) REFERENCES comments(comment_id)

    -- PRIMARY KEY (parent_id, comment_id)
);

CREATE TABLE images(

    image VARCHAR(400),
    image_id VARCHAR(400)
);


COMMIT;