import React, { useState } from 'react'
import { createContext } from 'react'

export const CustomRangeContext = createContext();

const CustomRange = (props) => {
  const [customRange, innerSetCustomRange] = useState({})

  const setCustomRange = (newRange) => {
    const orderedRange = Object.entries(newRange).sort(compareNames).reduce(
      (obj, [key, value]) => {
        obj['id-'+ key] = value; // without 'id-' the object is sorted automatially by the id
        return obj;
      }, 
      {}
    );
    innerSetCustomRange(orderedRange)
  }
  
  return (
    <CustomRangeContext.Provider value={{customRange, setCustomRange}}>
      {props.children}
    </CustomRangeContext.Provider>
  )
}

const compareNames = ( a, b ) => {
  if ( a[1]['name'] < b[1]['name'] ){
    return -1;
  }
  if ( a[1]['name'] > b[1]['name'] ){
    return 1;
  }
  return 0;
}

export default CustomRange
