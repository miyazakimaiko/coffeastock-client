const reorderRangeListItems = (rangeList) => {
  const orderedRangeList = {};
  Object.entries(rangeList).map(range => {
    const orderedRangeItems = reorderRangeItems(range[1]['items'])
    orderedRangeList[range[0]] = orderedRangeItems;
  })
  return orderedRangeList
}

const reorderRangeItems = (rangeItems) => {
  const orderedRangeItems = Object.entries(rangeItems).sort(sortByName).reduce(
    (obj, [key, value]) => {
      obj['id-' + key] = value; // without 'id-' the object is sorted automatially by the id
      return obj;
    }, 
    {}
  );
  return orderedRangeItems;
}

const sortByName = ( a, b ) => {
  if ( a[1]['label'] < b[1]['label'] ){
    return -1;
  }
  if ( a[1]['label'] > b[1]['label'] ){
    return 1;
  }
  return 0;
}

module.exports = {
  reorderRangeListItems,
  reorderRangeItems,
}