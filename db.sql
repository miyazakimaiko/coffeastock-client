CREATE TABLE unit_solid_weight (
  id SERIAL PRIMARY KEY,
  label varchar(60),
  short_label varchar(10),
  CONSTRAINT unit_solid_weight_label_unique UNIQUE (label)
);

CREATE TABLE unit_fluid_weight (
  id SERIAL PRIMARY KEY,
  label varchar(60),
  short_label varchar(10),
  CONSTRAINT unit_fluid_weight_label_unique UNIQUE (label)
);

CREATE TABLE unit_temperature (
  id SERIAL PRIMARY KEY,
  label varchar(60),
  short_label varchar(10),
  CONSTRAINT unit_temperature_label_unique UNIQUE (label)
);

INSERT INTO unit_solid_weight (label, short_label) VALUES ('gram', 'g');
INSERT INTO unit_solid_weight (label, short_label) VALUES ('ounce', 'oz');
INSERT INTO unit_solid_weight (label, short_label) VALUES ('pound', 'lb');

INSERT INTO unit_fluid_weight (label, short_label) VALUES ('milliliter', 'ml');
INSERT INTO unit_fluid_weight (label, short_label) VALUES ('gram', 'g');
INSERT INTO unit_fluid_weight (label, short_label) VALUES ('fluid ounce', 'fluid oz');

INSERT INTO unit_temperature (label, short_label) VALUES ('fahrenheit', 'ºF');
INSERT INTO unit_temperature (label, short_label) VALUES ('celcius', 'ºC');
INSERT INTO unit_temperature (label, short_label) VALUES ('kelvin', 'K');


CREATE TABLE users (
    user_id varchar(255) PRIMARY KEY NOT NULL,
    user_type varchar(20) NOT NULL, 
    unit_solid_weight_id INT NOT NULL,
    unit_fluid_weight_id INT NOT NULL,
    unit_temperature_id INT NOT NULL,
    origin_range jsonb,
    farm_range jsonb,
    variety_range jsonb,
    process_range jsonb,
    roaster_range jsonb,
    method_range jsonb,
    grinder_range jsonb,
    water_range jsonb,
    palate_range jsonb,
    aroma_range jsonb,
    FOREIGN KEY (unit_solid_weight_id) REFERENCES unit_solid_weight (id),
    FOREIGN KEY (unit_fluid_weight_id) REFERENCES unit_fluid_weight (id),
    FOREIGN KEY (unit_temperature_id) REFERENCES unit_temperature (id),
    CONSTRAINT check_user_type 
      CHECK (user_type = 'TRIAL' 
          OR user_type = 'BASIC'
          OR user_type = 'PREMIUM'
      )
);

CREATE TABLE beans (
    bean_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id varchar(255) NOT NULL,
    label varchar(60) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    single_origin boolean NOT NULL,
    blend_ratio jsonb,
    blend_bean_id_1 uuid,
    blend_bean_id_2 uuid,
    blend_bean_id_3 uuid,
    blend_bean_id_4 uuid,
    blend_bean_id_5 uuid,    
    origin INT [],
    farm INT [],
    variety INT [],
    process INT [],
    altitude varchar(60),
    grade NUMERIC(4, 1),
    harvest_period varchar(60),
    roaster INT [],
    roast_level NUMERIC(3, 1),
    roast_date date,
    aroma INT [],
    memo varchar(400),
    recipe_seq INT,
    FOREIGN KEY (user_id) REFERENCES USERS (user_id),
    FOREIGN KEY (blend_bean_id_1) REFERENCES beans (bean_id),
    FOREIGN KEY (blend_bean_id_2) REFERENCES beans (bean_id),
    FOREIGN KEY (blend_bean_id_3) REFERENCES beans (bean_id),
    FOREIGN KEY (blend_bean_id_4) REFERENCES beans (bean_id),
    FOREIGN KEY (blend_bean_id_5) REFERENCES beans (bean_id)
);

CREATE TABLE recipes (
    user_id varchar(255) NOT NULL,
    bean_id uuid NOT NULL,
    recipe_no INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    brew_date date,
    total_rate NUMERIC(4, 1),
    method INT [],
    grinder INT [],
    grind_size NUMERIC(7, 1),
    grounds_weight NUMERIC(7, 1),
    water_weight NUMERIC(7, 1),
    water INT [],
    water_temp NUMERIC(7, 1),
    yield_weight NUMERIC(7, 1),
    extraction_time interval,
    tds NUMERIC(4, 2),
    palate_rates jsonb,
    memo text,
    FOREIGN KEY (user_id)
        REFERENCES users (user_id),
    FOREIGN KEY (bean_id)
        REFERENCES beans (bean_id),
    PRIMARY KEY (bean_id, recipe_no)
);

-- Run
-- create extension if not exists "uuid-ossp"; 
-- on psql console inside the db to enable uuid

DROP TABLE RECIPES;
DROP TABLE BEANS;
DROP TABLE USERS;