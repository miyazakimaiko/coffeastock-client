import React, { useState } from 'react'
import { createContext } from 'react'

export const CustomRangeContext = createContext();

const CustomRange = (props) => {
  const [customRange, setCustomRange] = useState({})

  const addCustomRange = (newRange) => {
    const orderedRange = Object.keys(newRange).sort().reduce(
      (obj, key) => { 
        obj[key] = newRange[key]; 
        return obj;
      }, 
      {}
    );
    setCustomRange(orderedRange)
  }
  
  return (
    <CustomRangeContext.Provider value={{customRange, setCustomRange, addCustomRange}}>
      {props.children}
    </CustomRangeContext.Provider>
  )
}

export default CustomRange
