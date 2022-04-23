module.exports.reorderAttributeRangeList = function(attributeList) {
  const orderedRangeList = {};
  Object.entries(attributeList).map(attributes => {
    const orderedRange = Object.entries(attributes[1]['range']).sort(sortByName).reduce(
      (obj, [key, value]) => {
        value['value'] = key; // ID is named as value to enable react-multi-select-component correctly
        obj['id-' + key] = value; // without 'id-' the object is sorted automatially by the id
        return obj;
      }, {}
    );
    orderedRangeList[attributes[0]] = orderedRange;
  });
  return orderedRangeList;
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