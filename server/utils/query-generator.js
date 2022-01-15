const getGetRangeBaseQuery = (rangeName) => {
  let baseQuery = '';
  switch(rangeName) {
    case 'origin':
      baseQuery = `SELECT origin_range::jsonb->'range' as range FROM users WHERE user_id = $1`;
      break;
    case 'farm':
      baseQuery = `SELECT farm_range::jsonb->'range' as range FROM users WHERE user_id = $1`;
      break;
    case 'variety':
      baseQuery = `SELECT variety_range::jsonb->'range' as range FROM users WHERE user_id = $1`;
      break;
    case 'process':
      baseQuery = `SELECT process_range::jsonb->'range' as range FROM users WHERE user_id = $1`;
      break;
    case 'roaster':
      baseQuery = `SELECT roaster_range::jsonb->'range' as range FROM users WHERE user_id = $1`;
      break;
    case 'aroma':
      baseQuery = `SELECT aroma_range::jsonb->'range' as range FROM users WHERE user_id = $1`;
      break;
    case 'grinder':
      baseQuery = `SELECT grinder_range::jsonb->'range' as range FROM users WHERE user_id = $1`; 
      break;
    case 'method':
      baseQuery = `SELECT method_range::jsonb->'range' as range FROM users WHERE user_id = $1`;
      break;
    case 'water':
      baseQuery = `SELECT water_range::jsonb->'range' as range FROM users WHERE user_id = $1`;
      break;
    case 'palate':
      baseQuery = `SELECT palate_range::jsonb->'range' as range FROM users WHERE user_id = $1`;
      break;
    default:
      break;
  }
  return baseQuery;
}

const getFindEntryByIdBaseQuery = (rangeName) => {
  let baseQuery = '';
  switch(rangeName) {
    case 'origin':
      baseQuery = `SELECT jsonb_object_keys(origin_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    case 'farm':
      baseQuery = `SELECT jsonb_object_keys(farm_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    case 'variety':
      baseQuery = `SELECT jsonb_object_keys(variety_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    case 'process':
      baseQuery = `SELECT jsonb_object_keys(process_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    case 'roaster':
      baseQuery = `SELECT jsonb_object_keys(roaster_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    case 'aroma':
      baseQuery = `SELECT jsonb_object_keys(aroma_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    case 'grinder':
      baseQuery = `SELECT jsonb_object_keys(grinder_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    case 'method':
      baseQuery = `SELECT jsonb_object_keys(method_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    case 'water':
      baseQuery = `SELECT jsonb_object_keys(water_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    case 'palate':
      baseQuery = `SELECT jsonb_object_keys(palate_range::jsonb->'range') as id FROM users WHERE user_id = $1`;
      break;
    default:
      break;
  }
  return baseQuery;
}

const getPostRangeBaseQuery = (rangeName) => {
  let baseQuery = '';
  switch(rangeName) {
    case 'origin':
      baseQuery = `SELECT (origin_range::jsonb->'range') as range FROM users WHERE user_id = $1`;
      break;
    case 'farm':
      baseQuery = `SELECT (farm_range::jsonb->'range') as range FROM users WHERE user_id = $1`;
      break;
    case 'variety':
      baseQuery = `SELECT (variety_range::jsonb->'range') as range FROM users WHERE user_id = $1`;
      break;
    case 'process':
      baseQuery = `SELECT (process_range::jsonb->'range') as range FROM users WHERE user_id = $1`;
      break;
    case 'roaster':
      baseQuery = `SELECT (roaster_range::jsonb->'range') as range FROM users WHERE user_id = $1`;
      break;
    case 'aroma':
      baseQuery = `SELECT (aroma_range::jsonb->'range') as range FROM users WHERE user_id = $1`;
      break;
    case 'grinder':
      baseQuery = `SELECT (grinder_range::jsonb->'range') as range FROM users WHERE user_id = $1`; 
      break;
    case 'method':
      baseQuery = `SELECT (method_range::jsonb->'range') as range FROM users WHERE user_id = $1`;
      break;
    case 'water':
      baseQuery = `SELECT (water_range::jsonb->'range') as range FROM users WHERE user_id = $1`;
      break;
    case 'palate':
      baseQuery = `SELECT (palate_range::jsonb->'range') as range FROM users WHERE user_id = $1`;
      break;
    default:
      res.status(500).json({
        'status': 'error',
        'message': 'invalid query'});
  }
  return baseQuery;
}

const getGetNextIdBaseQuery = (rangeName) => {
  let baseQuery = '';
  switch(rangeName) {
    case 'origin':
      baseQuery = `SELECT origin_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    case 'farm':
      baseQuery = `SELECT farm_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    case 'variety':
      baseQuery = `SELECT variety_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    case 'process':
      baseQuery = `SELECT process_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    case 'roaster':
      baseQuery = `SELECT roaster_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    case 'aroma':
      baseQuery = `SELECT aroma_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    case 'grinder':
      baseQuery = `SELECT grinder_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    case 'method':
      baseQuery = `SELECT method_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    case 'water':
      baseQuery = `SELECT water_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    case 'palate':
      baseQuery = `SELECT palate_range::jsonb->'next_id' as next_id FROM users WHERE user_id = $1`;
      break;
    default:
      break;
  }
  return baseQuery;
}

const getUpdateNextIdBaseQuery = (rangeName) => {
  let baseQuery = '';
  switch(rangeName) {
    case 'origin':
      baseQuery = `UPDATE users SET origin_range = jsonb_set(origin_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'farm':
      baseQuery = `UPDATE users SET farm_range = jsonb_set(farm_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'variety':
      baseQuery = `UPDATE users SET variety_range = jsonb_set(variety_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'process':
      baseQuery = `UPDATE users SET process_range = jsonb_set(process_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'roaster':
      baseQuery = `UPDATE users SET roaster_range = jsonb_set(roaster_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'aroma':
      baseQuery = `UPDATE users SET aroma_range = jsonb_set(aroma_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'grinder':
      baseQuery = `UPDATE users SET grinder_range = jsonb_set(grinder_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'method':
      baseQuery = `UPDATE users SET method_range = jsonb_set(method_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'water':
      baseQuery = `UPDATE users SET water_range = jsonb_set(water_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'palate':
      baseQuery = `UPDATE users SET palate_range = jsonb_set(palate_range, '{next_id}', $1) WHERE user_id = $2 RETURNING *`;
      break;
    default:
      break;
  }
  return baseQuery;
}

const getInsertRangeBaseQuery = (rangeName) => {
  let baseQuery = '';
  switch(rangeName) {
    case 'origin':
      baseQuery = `UPDATE users SET origin_range = jsonb_set(origin_range, '{range}', origin_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'farm':
      baseQuery = `UPDATE users SET farm_range = jsonb_set(farm_range, '{range}', farm_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'variety':
      baseQuery = `UPDATE users SET variety_range = jsonb_set(variety_range, '{range}', variety_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'process':
      baseQuery = `UPDATE users SET process_range = jsonb_set(process_range, '{range}', process_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'roaster':
      baseQuery = `UPDATE users SET roaster_range = jsonb_set(roaster_range, '{range}', roaster_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'aroma':
      baseQuery = `UPDATE users SET aroma_range = jsonb_set(aroma_range, '{range}', aroma_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'grinder':
      baseQuery = `UPDATE users SET grinder_range = jsonb_set(grinder_range, '{range}', grinder_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'method':
      baseQuery = `UPDATE users SET method_range = jsonb_set(method_range, '{range}', method_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'water':
      baseQuery = `UPDATE users SET water_range = jsonb_set(water_range, '{range}', water_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'palate':
      baseQuery = `UPDATE users SET palate_range = jsonb_set(palate_range, '{range}', palate_range->'range' || $1) WHERE user_id = $2 RETURNING *`;
      break;
    default:
      break;
  }
  return baseQuery;
}

const getDeleteRangeBaseQuery = (rangeName) => {
  let baseQuery = '';
  switch(rangeName) {
    case 'origin':
      baseQuery = `UPDATE users SET origin_range = jsonb_set(origin_range, '{range}', (origin_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'farm':
      baseQuery = `UPDATE users SET farm_range = jsonb_set(farm_range, '{range}', (farm_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'variety':
      baseQuery = `UPDATE users SET variety_range = jsonb_set(variety_range, '{range}', (variety_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'process':
      baseQuery = `UPDATE users SET process_range = jsonb_set(process_range, '{range}', (process_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'roaster':
      baseQuery = `UPDATE users SET roaster_range = jsonb_set(roaster_range, '{range}', (roaster_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'aroma':
      baseQuery = `UPDATE users SET aroma_range = jsonb_set(aroma_range, '{range}', (aroma_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'grinder':
      baseQuery = `UPDATE users SET grinder_range = jsonb_set(grinder_range, '{range}', (grinder_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'method':
      baseQuery = `UPDATE users SET method_range = jsonb_set(method_range, '{range}', (method_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'water':
      baseQuery = `UPDATE users SET water_range = jsonb_set(water_range, '{range}', (water_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    case 'palate':
      baseQuery = `UPDATE users SET palate_range = jsonb_set(palate_range, '{range}', (palate_range->'range') - $1) WHERE user_id = $2 RETURNING *`;
      break;
    default:
      break;
  }
  return baseQuery;
}

module.exports = { 
  getGetRangeBaseQuery, 
  getPostRangeBaseQuery,
  getGetNextIdBaseQuery,
  getUpdateNextIdBaseQuery,
  getInsertRangeBaseQuery,
  getDeleteRangeBaseQuery,
  getFindEntryByIdBaseQuery
}