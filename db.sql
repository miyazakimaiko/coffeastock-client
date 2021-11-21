CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username varchar(60) UNIQUE NOT NULL,
    email citext UNIQUE NOT NULL,
    password varchar(60) NOT NULL,
    origin_range varchar(60) [],
    farmer_range jsonb,
    variety_range varchar(60) [],
    process_range varchar(60) [],
    coffee_grade_range jsonb,
    roaster_range jsonb,
    roast_level_range jsonb,
    method_range varchar(60) [],
    grinder_range varchar(60) [],
    water_type_range jsonb,
    palates varchar(60) []
);

CREATE TABLE beans (
    bean_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    bean_name varchar(60) NOT NULL,
    origins varchar(60) [],
    farmers varchar(60) [],
    varieties varchar(60) [],
    processes varchar(60) [],
    grade float,
    roaster varchar(60),
    roast_level varchar(60),
    roast_date date,
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
);

INSERT INTO beans (user_id, bean_name, origins, farmers, varieties)
VALUES (1, 'Waltz Blend', '{"Kenya", "Ethiopia"}', '{"farmer 1", "farmer 2"}', '{"Typica", "Caturra"}');

CREATE TABLE recipes (
    recipe_id serial PRIMARY KEY,
    bean_id INT NOT NULL,
    brew_date date,
    method varchar(60),
    grinder varchar(60),
    grinder_size float,
    grounds_weight float,
    water_weight float,
    water_type varchar(60),
    water_temp float,
    yield_weight float,
    brew_time interval,
    tds float,
    palate_rates jsonb,
    note text,
    FOREIGN KEY (bean_id)
        REFERENCES beans (bean_id)
);


INSERT INTO users (username, email, password, origin_range, water_type_range, palates)
VALUES ('Maiko.M', 'myzkmik19922@gmail.com', 'maiko1992', ARRAY['Ethiopia', 'Kenya', 'Rwanda'], '{"Water 1": {"loc": "北海道", "ph": 7.0}, "Water 2": {"loc": "Swiss", "ph": 6.5}}', ARRAY['sweet', 'acidic', 'bitter']);


