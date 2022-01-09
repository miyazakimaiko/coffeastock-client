CREATE TABLE USERS (
    user_id varchar(255) PRIMARY KEY NOT NULL,
    origin_range jsonb,
    farm_range jsonb,
    variety_range jsonb,
    process_range jsonb,
    roaster_range jsonb,
    method_range jsonb,
    grinder_range jsonb,
    water_range jsonb,
    palate_range jsonb,
    aroma_range jsonb
);

INSERT INTO users (
  user_id, 
  origin_range, 
  variety_range, 
  process_range, 
  roaster_range, 
  method_range, 
  water_range, 
  grinder_range,
  palate_range,
  aroma_range
)
VALUES (
  '123455', 
  '{
    "1" : {
      "name": "Yirgacheffe, Ethiopia",
      "def": "Location details here..."
    },
    "2": {
      "name": "Sidamo, Ethiopia",
      "def": "Location details here..."
    },
    "3": {
      "name": "Kaffa, Ethiopia",
      "def": "Location details here..."
    },
    "4": {
      "name": "Ruiri, Kenya",
      "def": "Location details here..."
    },
    "5": {
      "name": "Thika, Kenya",
      "def": "Location details here..."
    }
  }',
  '{
    "1" : {
      "name": "Typica",
      "def": "Details what typica is..."
    },
    "2": {
      "name": "Caturra",
      "def": "Details what caturra is..."
    },
    "3": {
      "name": "Burbon",
      "def": "Details what Burbon is..."
    } 
  }', 
  '{
    "1" : {
      "name": "Washed",
      "def": "Details what washed is..."
    },
    "2": {
      "name": "Semi-Washed",
      "def": "Details what semi-washed is..."
    },
    "3": {
      "name": "Natural",
      "def": "Details what natural is..."
    }
  }', 
  '{
    "1" : {
      "name": "Coffeeangel",
      "def": "Definition of Coffeeangel..."
    },
    "2": {
      "name": "Coffee Collective",
      "def": "Coffee Collective definition..."
    },
    "3": {
      "name": "Koppi",
      "def": "Koppi details..."
    }
  }',
  '{
    "1" : {
      "name": "French Press",
      "def": "details..."
    },
    "2": {
      "name": "Espresso",
      "def": "details..."
    },
    "3": {
      "name": "Mocha Pot",
      "def": "details..."
    }
  }',
  '{
    "1" : {
      "name": "Water 1",
      "def": "details..."
    },
    "2": {
      "name": "Water 2",
      "def": "details..."
    }
  }',
  '{
    "1" : {
      "name": "Hario Mini Handmill",
      "def": "details..."
    },
    "2": {
      "name": "EKS",
      "def": "details..."
    },
    "3": {
      "name": "Sage espresso grinder",
      "def": "details..."
    }
  }',
  '{
    "1" : {
      "name": "sweet",
      "def": "details..."
    },
    "2": {
      "name": "acidic",
      "def": "details..."
    },
    "3": {
      "name": "cherries",
      "def": "details..."
    },
    "4" : {
      "name": "stonefruit",
      "def": "details..."
    },
    "5": {
      "name": "citrus fruit",
      "def": "details..."
    },
    "6": {
      "name": "chocolate",
      "def": "details..."
    }
  }',
  '{
    "1" : {
      "name": "Walnut",
      "def": "details..."
    },
    "2": {
      "name": "Peach",
      "def": "details..."
    },
    "3": {
      "name": "Pineapple",
      "def": "details..."
    },
    "4" : {
      "name": "Green apple",
      "def": "details..."
    }
  }'
);

CREATE TABLE BEANS (
    coffee_bean_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    coffee_bean_name varchar(60) NOT NULL,
    blend_ratio jsonb,
    origin INT,
    farm INT [],
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
  coffee_bean_name,
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
  '6021b8e4-8e58-4d81-a00a-81a19ad8df63', 
  'Kieni', 
  1, 
  '{1}', 
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
    coffee_bean_id uuid NOT NULL,
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
    FOREIGN KEY (coffee_bean_id)
        REFERENCES BEANS (coffee_bean_id)
);


INSERT INTO RECIPES (
  coffee_bean_id,
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
  'da1f2bd8-c7de-4e82-a0c2-a319274025e7',
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