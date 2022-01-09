import React, { useState } from 'react'
import { createContext } from 'react'

export const CustomRangeContext = createContext();

const CustomRange = (props) => {
  const [customRange, setCustomRange] = useState([])
  return (
    <CustomRangeContext.Provider value={{customRange, setCustomRange}}>
      {props.children}
    </CustomRangeContext.Provider>
  )
}

export default CustomRange
