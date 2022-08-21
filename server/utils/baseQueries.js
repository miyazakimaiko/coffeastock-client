const getGetRangeBaseQuery = (rangeName) => {
  return `SELECT ${rangeName}_range::jsonb->'items' as items FROM users WHERE user_id = $1`
}

const getGetPagenatedRangeBaseQuery = (rangeName, pageNumber) => {
  const offset = (pageNumber - 1) * 10;
  return `
    WITH unnested_range as (
      SELECT 
        jsonb_array_elements(jsonb_path_query_array(${rangeName}_range::jsonb->'items', '$.*')) as items,
        jsonb_array_length(jsonb_path_query_array(${rangeName}_range::jsonb->'items', '$.*')) as count
      FROM users
      WHERE user_id = $1 
      LIMIT 10 
      OFFSET ${offset}
    )
    SELECT COALESCE(jsonb_agg(items), '[]') as items, COALESCE(jsonb_agg(count) -> 0, '0') as totalCount from unnested_range
  `
}

const getFindEntryByIdBaseQuery = (rangeName) => {
  return `SELECT jsonb_object_keys(${rangeName}_range::jsonb->'items') as id FROM users WHERE user_id = $1`
}

const getGetNextIdBaseQuery = (rangeName) => {
  return `SELECT ${rangeName}_range::jsonb->'nextId' as nextid FROM users WHERE user_id = $1`
}

const getUpdateNextIdBaseQuery = (rangeName) => {
  return `UPDATE users SET ${rangeName}_range = jsonb_set(${rangeName}_range, '{nextId}', $1) WHERE user_id = $2 RETURNING *`
}

const getIncrementCountInUseBaseQuery = (rangeName, id) => {
  return `UPDATE users 
      SET ${rangeName}_range = jsonb_set(${rangeName}_range, '{items, ${id}, inUse}', 
        (COALESCE(${rangeName}_range->'items'->'${id}'->'inUse','0')::int + 1)::text::jsonb) 
      WHERE user_id = $1`;
}

const getDecrementCountInUseBaseQuery = (rangeName, id) => {
  return `UPDATE users 
      SET ${rangeName}_range = jsonb_set(${rangeName}_range, '{items, ${id}, inUse}', 
        (COALESCE(${rangeName}_range->'items'->'${id}'->'inUse','0')::int - 1)::text::jsonb) 
      WHERE user_id = $1`;
}

const getInsertRangeBaseQuery = (rangeName) => {
  return `UPDATE users SET ${rangeName}_range = jsonb_set(${rangeName}_range, '{items}', ${rangeName}_range->'items' || $1) WHERE user_id = $2 RETURNING *`
}

const getDeleteRangeBaseQuery = (rangeName) => {
  return `UPDATE users 
    SET ${rangeName}_range = jsonb_set(${rangeName}_range, '{items}', (${rangeName}_range->'items') - $1) 
    WHERE user_id = $2 RETURNING *`
}

module.exports = { 
  getGetRangeBaseQuery,
  getGetPagenatedRangeBaseQuery,
  getGetNextIdBaseQuery,
  getUpdateNextIdBaseQuery,
  getIncrementCountInUseBaseQuery,
  getDecrementCountInUseBaseQuery,
  getInsertRangeBaseQuery,
  getDeleteRangeBaseQuery,
  getFindEntryByIdBaseQuery
}