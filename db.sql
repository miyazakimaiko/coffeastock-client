CREATE TABLE USERS (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar(255) UNIQUE NOT NULL,
    email citext UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    origin_range jsonb,
    variety_range jsonb,
    process_range jsonb,
    roaster_range jsonb,
    method_range jsonb,
    grinder_range jsonb,
    water_range jsonb,
    palates jsonb,
    aroma jsonb
);

INSERT INTO users (
  username, 
  email, 
  password, 
  origin_range, 
  variety_range, 
  process_range, 
  roaster_range, 
  method_range, 
  water_range, 
  grinder_range,
  palates,
  aroma
)
VALUES (
  'Maiko.M', 
  'myzkmik19922@gmail.com', 
  'maiko1992', 
  '{
    "1": {
      "country": "Ethiopia",
      "region": [
        "Yirgacheffe", 
        "Sidamo", 
        "Kaffa"
    },
    "2": {
      "country": "Kenya",
      "region": [
        "Ruiri", 
        "Thika", 
        "Kirinyaga"
      ]
    }
  }',
  '{
    "1": "Typica",
    "2": "Caturra",
    "3": "Burbon"
  }', 
  '{
    "1": "Washed",
    "2": "Semi-Washed",
    "3": "Natural"
  }', 
  '{
    "1": {
      "name": "Coffeeangel",
      "country": "Ireland"
    },
    "2": {
      "name": "Coffee Collective",
      "country": "Holland"
    },
    "3": {
      "name": "Koppi",
      "country": "Switzerland"
    }
  }',
  '{
    "1": "French Press",
    "2": "Espresso",
    "3": "Mocha Pot"
  }',
  '{
    "1": {
      "name": "Water 1",
      "loc": "北海道",
      "ph": 7.0
    },
    "2": {
      "name": "Water 2",
      "loc": "Swiss",
      "ph": 6.5
    }
  }',
  '{
    "1": "Hario Mini Handmill",
    "2": "EKS",
    "3": "Sage espresso grinder"
  }',
  '{
    "1": "sweet",
    "2": "acidic",
    "3": "cherries",
    "4": "stonefruit",
    "5": "citrus fruit",
    "6": "chocolate"
  }',
  '{
    "1": "Walnut",
    "2": "Peach",
    "3": "Pineapple",
    "4": "Green apple"
  }'
);

CREATE TABLE BEANS (
    product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    product_name varchar(60) NOT NULL,
    blend_ratio jsonb,
    origin INT,
    farm varchar(60),
    varieties INT [],
    processing INT,
    altitude varchar(60),
    grading float,
    harvest_date varchar(60),
    roaster INT,
    roast_level float,
    roast_date date,
    aroma INT [],
    FOREIGN KEY (user_id)
        REFERENCES USERS (user_id)
);

INSERT INTO BEANS (
  user_id, 
  product_name,
  origin, 
  farm, 
  varieties, 
  processing, 
  altitude,
  grading,
  harvest_date,
  roaster,
  roast_level,
  roast_date,
  aroma
)
VALUES (
  1, 
  'Kieni', 
  1, 
  'Farm 1', 
  '{1, 2}', 
  2, 
  '1100-1200 MASL',
  8.5,
  'Sept - Oct 2020',
  3,
  5,
  '2021-10-21',
  '{1, 2, 4}'
);


CREATE TABLE RECIPES (
    recipe_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id uuid NOT NULL,
    brew_date date,
    method INT,
    grinder INT,
    grind_size float,
    grounds_weight float,
    water_weight float,
    water_type INT,
    water_temp float,
    yield_weight float,
    extraction_time interval,
    tds float,
    palate_rates jsonb,
    comment text,
    FOREIGN KEY (product_id)
        REFERENCES BEANS (product_id)
);


INSERT INTO RECIPES (
  product_id,
  brew_date,
  method,
  grinder,
  grind_size,
  grounds_weight,
  water_weight,
  water_type,
  water_temp,
  yield_weight,
  extraction_time,
  tds,
  palate_rates,
  comment
)
VALUES (
  1,
  '2021-10-22',
  1,
  2,
  3.5,
  18.5,
  250,
  2,
  95,
  200,
  '00:03:00',
  9.1,
  '{"1": 8, "2": 5, "3": 3, "4": 8, "5": 7, "6": 8, "7": 4}',
  'I really like this coffee, and think the best one from this roastery. Very fruty and mild yet strong body. Very nice when brewed with V60... I really like this coffee, and think the best one from this roastery. Very fruty and mild yet strong body. Very nice when brewed with V60...'
);

-- Run
-- create extension if not exists "uuid-ossp"; 
-- on psql console inside the db to enable uuid