ALTER DATABASE area_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE user (
    id int NOT NULL UNIQUE PRIMARY KEY auto_increment,
    email varchar(255) NOT NULL UNIQUE,
    name varchar(255),
    surname varchar(255),
    salt varchar(255),
    password_hash varchar(255),
    is_google int NOT NULL,
    reddit_token varchar(255),
    google_token varchar(255),
    last_connection TIMESTAMP
);

CREATE TABLE service (
    id int NOT NULL UNIQUE PRIMARY KEY auto_increment,
    name varchar(255) NOT NULL,
    connected int NOT NULL
);

CREATE TABLE area (
    id int NOT NULL UNIQUE PRIMARY KEY auto_increment,
    id_user int NOT NULL,
    action varchar(255),
    reaction varchar(255),
    payload varchar(255)
);

create TABLE actioncard (
    id int NOT NULL UNIQUE PRIMARY KEY auto_increment,
    userId varchar(255) NOT NULL,
    serviceAction varchar(255),
    serviceReaction varchar(255),
    action varchar(255),
    reaction varchar(255),
    message varchar(255),
    webhook varchar(255),
    botToken varchar(255),
    frequency varchar(255),
    specificMessage varchar(255),
    jokeChannel varchar(255),
    weatherChannel varchar(255),
    city varchar(255),
    cityAction varchar(255),
    tokenCheckMessage varchar(255),
    subreddit varchar(255),
    redditDescription varchar(255),
    redditTitle varchar(255),
    redditWebhook varchar(255),
    player varchar(255),
    riotKey varchar(255),
    status int NOT NULL
);

create table log (
    id int NOT NULL UNIQUE PRIMARY KEY auto_increment,
    userId varchar(255) NOT NULL,
    message varchar(255),
    creator varchar(255)
);