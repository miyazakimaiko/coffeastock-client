const attachKeysToRangeListItems = (rangeList) => {
  const orderedRangeList = {};
  Object.entries(rangeList).map(range => {
    const orderedRangeItems = attachKeysToRangeItems(range[1]['items'])
    orderedRangeList[range[0]] = orderedRangeItems;
  })
  return orderedRangeList
}

const attachKeysToRangeItems = (rangeItems) => {
  const orderedRangeItems = Object.entries(rangeItems).reduce(
    (obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, 
    {}
  );
  return orderedRangeItems;
}

module.exports = {
  attachKeysToRangeItems,
  attachKeysToRangeListItems,
}