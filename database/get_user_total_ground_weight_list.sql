CREATE OR REPLACE FUNCTION get_user_total_ground_weight_list(
    pn_user_id users.user_id%type
)
RETURNS VARCHAR
AS
$$
DECLARE
  lv_total_size VARCHAR;

BEGIN
  DROP TABLE IF EXISTS user_all_ranges;
  DROP TABLE IF EXISTS user_all_beans;
  DROP TABLE IF EXISTS user_all_recipes;

  CREATE TEMPORARY TABLE user_all_ranges
  AS 
    SELECT * 
      FROM users 
     WHERE user_id = pn_user_id;

  CREATE TEMPORARY TABLE user_all_beans
  AS 
    SELECT * 
      FROM beans 
     WHERE user_id = pn_user_id;

  CREATE TEMPORARY TABLE user_all_recipes
  AS 
    SELECT * 
      FROM recipes 
     WHERE user_id = pn_user_id;

  SELECT TRUNC(SUM(pg_total_relation_size) / 1000000, 3)  -- in MB
    INTO lv_total_size
    FROM (SELECT pg_total_relation_size('user_all_ranges')
          UNION (SELECT pg_total_relation_size('user_all_beans'))
          UNION (SELECT pg_total_relation_size('user_all_recipes'))
          ) AS each_tables_bytes;

  RETURN lv_total_size;

  EXCEPTION 
    WHEN others THEN 
          RAISE EXCEPTION 'Exception occured calling get_user_total_used_mb()';

END;
$$
LANGUAGE plpgsql;