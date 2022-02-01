import React, { useState } from 'react'
import { createContext } from 'react'

export const CustomRangesContext = createContext();

const CustomRanges = (props) => {
  // All Ranges
  const [customRanges, innerSetCustomRanges] = useState({})

  const fetchCustomRanges = async (userid) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/ranges`,
        { method: "GET" }
      );
      const parseRes = await response.json();  
      setCustomRanges(parseRes);
    } catch (error) {}
  };

  const setCustomRanges = (newRanges) => {
    const orderedRanges = {};
    Object.entries(newRanges).map(range => {
      const orderedRange = Object.entries(range[1]['range']).sort(compareNames).reduce(
        (obj, [key, value]) => {
          value['value'] = key; // ID is named as value to enable react-multi-select-component correctly
          obj['id-' + key] = value; // without 'id-' the object is sorted automatially by the id
          return obj;
        }, 
        {}
      );
      orderedRanges[range[0]] = orderedRange;
    });
    innerSetCustomRanges(orderedRanges)
  }

  // Certain range
  const fetchCustomRange = async (userid, category) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/range/${category}`,
        { method: "GET" }
      );
      const parseRes = await response.json();
      setCustomRange(parseRes, category);
    } catch (error) {}
  }

  const setCustomRange = (newRange, category) => {
    const rangeName = category + "_range";
    const orderedRange = Object.entries(newRange).sort(compareNames).reduce(
      (obj, [key, value]) => {
        value['value'] = key; // ID is named as value to enable react-multi-select-component correctly
        obj['id-' + key] = value; // without 'id-' the object is sorted automatially by the id
        return obj;
      }, 
      {}
    );
    let orderedRanges = customRanges;
    orderedRanges[rangeName] = orderedRange;
    innerSetCustomRanges(orderedRanges);
  }
  
  return (
    <CustomRangesContext.Provider value={{customRanges, setCustomRanges, fetchCustomRanges, fetchCustomRange, setCustomRange }}>
      {props.children}
    </CustomRangesContext.Provider>
  )
}

const compareNames = ( a, b ) => {
  if ( a[1]['label'] < b[1]['label'] ){
    return -1;
  }
  if ( a[1]['label'] > b[1]['label'] ){
    return 1;
  }
  return 0;
}

export default CustomRanges
