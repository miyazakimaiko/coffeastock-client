module.exports.reorderRange = function(attributes) {
  const orderedAttributes = Object.entries(attributes).sort(sortByName).reduce(
    (obj, [key, value]) => {
      value['value'] = key; // ID is named as value to enable react-multi-select-component correctly
      obj['id-' + key] = value; // without 'id-' the object is sorted automatially by the id
      return obj;
    }, 
    {}
  );
  return orderedAttributes;
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