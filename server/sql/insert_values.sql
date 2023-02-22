INSERT INTO user (
    email, name, surname, password_hash, salt, is_google
) values (
    'john.doe@gmail.com',
    'John',
    'Doe',
    '$2a$10$.cUTbwEAu4eCLVCeB/pHhetH4Qi4nkauFNcFRPd46pbE8HJqW7coC',
    '$2a$10$.cUTbwEAu4eCLVCeB/pHhe',
    0
);

INSERT INTO service (
    name, connected
) values (
    'discord',
    0
);

INSERT INTO service (
    name, connected
) values (
    'twitter',
    0
);

INSERT INTO service (
    name, connected
) values (
    'weather',
    0
);