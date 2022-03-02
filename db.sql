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
      "label": "Yirgacheffe, Ethiopia",
      "def": "Location details here..."
    },
    "2": {
      "label": "Sidamo, Ethiopia",
      "def": "Location details here..."
    },
    "3": {
      "label": "Kaffa, Ethiopia",
      "def": "Location details here..."
    },
    "4": {
      "label": "Ruiri, Kenya",
      "def": "Location details here..."
    },
    "5": {
      "label": "Thika, Kenya",
      "def": "Location details here..."
    }
  }',
  '{
    "1" : {
      "label": "Typica",
      "def": "Details what typica is..."
    },
    "2": {
      "label": "Caturra",
      "def": "Details what caturra is..."
    },
    "3": {
      "label": "Burbon",
      "def": "Details what Burbon is..."
    } 
  }', 
  '{
    "1" : {
      "label": "Washed",
      "def": "Details what washed is..."
    },
    "2": {
      "label": "Semi-Washed",
      "def": "Details what semi-washed is..."
    },
    "3": {
      "label": "Natural",
      "def": "Details what natural is..."
    }
  }', 
  '{
    "1" : {
      "label": "Coffeeangel",
      "def": "Definition of Coffeeangel..."
    },
    "2": {
      "label": "Coffee Collective",
      "def": "Coffee Collective definition..."
    },
    "3": {
      "label": "Koppi",
      "def": "Koppi details..."
    }
  }',
  '{
    "1" : {
      "label": "French Press",
      "def": "details..."
    },
    "2": {
      "label": "Espresso",
      "def": "details..."
    },
    "3": {
      "label": "Mocha Pot",
      "def": "details..."
    }
  }',
  '{
    "1" : {
      "label": "Water 1",
      "def": "details..."
    },
    "2": {
      "label": "Water 2",
      "def": "details..."
    }
  }',
  '{
    "1" : {
      "label": "Hario Mini Handmill",
      "def": "details..."
    },
    "2": {
      "label": "EKS",
      "def": "details..."
    },
    "3": {
      "label": "Sage espresso grinder",
      "def": "details..."
    }
  }',
  '{
    "1" : {
      "label": "sweet",
      "def": "details..."
    },
    "2": {
      "label": "acidic",
      "def": "details..."
    },
    "3": {
      "label": "cherries",
      "def": "details..."
    },
    "4" : {
      "label": "stonefruit",
      "def": "details..."
    },
    "5": {
      "label": "citrus fruit",
      "def": "details..."
    },
    "6": {
      "label": "chocolate",
      "def": "details..."
    }
  }',
  '{
    "1" : {
      "label": "Walnut",
      "def": "details..."
    },
    "2": {
      "label": "Peach",
      "def": "details..."
    },
    "3": {
      "label": "Pineapple",
      "def": "details..."
    },
    "4" : {
      "label": "Green apple",
      "def": "details..."
    }
  }'
);

CREATE TABLE BEANS (
    coffee_bean_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id varchar(255) NOT NULL,
    label varchar(60) NOT NULL,
    single_origin boolean NOT NULL,
    blend_ratio jsonb,
    origin INT [],
    farm INT [],
    variety INT [],
    process INT [],
    altitude varchar(60),
    grade float,
    harvest_period varchar(60),
    roaster INT [],
    roast_level float,
    roast_date date,
    aroma INT [],
    memo varchar(400),
    FOREIGN KEY (user_id)
        REFERENCES USERS (user_id)
);

INSERT INTO BEANS (
  user_id, 
  label,
  single_origin,
  origin, 
  farm, 
  variety, 
  process, 
  altitude,
  grade,
  harvest_period,
  roaster,
  roast_level,
  roast_date,
  aroma,
  memo
)
VALUES (
  '30a80906-2334-48ec-9f5d-88e0f68210fc', 
  'SO Beans 3', 
  'f',
  '{2}', 
  '{1, 2}', 
  '{1}', 
  '{2}', 
  '1100-1200 MASL',
  55.5,
  'Sept - Oct 2020',
  '{1}',
  5,
  '2021-10-18',
  '{1, 2, 4}',
  'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Ev'
);

INSERT INTO BEANS (
  user_id, 
  label,
  single_origin,
  origin, 
  farm, 
  variety, 
  process, 
  altitude,
  grade,
  harvest_period,
  roaster,
  roast_level,
  roast_date,
  aroma,
  memo
)
VALUES (
  '30a80906-2334-48ec-9f5d-88e0f68210fc', 
  'SO Beans 2',
  'f',
  '{2}', 
  '{3}', 
  '{2, 3}', 
  '{1}', 
  '1200-1300 MASL',
  90.0,
  'Aug - Oct 2021',
  '{2}',
  5.5,
  '2021-12-10',
  '{2, 3}',
  'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure r'
);

INSERT INTO BEANS (
  user_id, 
  label,
  single_origin,
  blend_ratio,
  grade,
  roaster,
  roast_level,
  roast_date,
  aroma,
  memo
)
VALUES (
  '30a80906-2334-48ec-9f5d-88e0f68210fc', 
  'Blend 1',
  't',
  '{"b08b8b04-9903-42f6-aad0-d9c72ec11dd4": "60%", "07452d28-9a6d-4224-b150-f3d065fa2220": "40%"}',
  92.8,
  '{2}',
  5.5,
  '2021-12-10',
  '{2, 3}',
  'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary t'
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
    memo text,
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
  memo
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