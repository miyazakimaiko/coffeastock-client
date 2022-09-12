import React, { useEffect, useState } from 'react'
import { MAX_NUMBER } from '../../../utils/Constants';

const PalateRateInput = ({title, parateId, palateRate, setPalateRate}) => {

  const [rangeWarningText, setRangeWarningText] = useState("");

  const setPalateLevel = (level) => {
    if (level < 0.0) {
      setRangeWarningText(<span className="text-red">Please enter a positive number</span>)
    } else {
      setRangeWarningText("")
    }
    setPalateRate(parateId, level)
  }

  useEffect(() => {
    if (palateRate === undefined) {
      setPalateLevel("5")
    }
  }, [])

  return (

    <>
      <div className="form-section w-full height-fit">
        <label className="font-medium">{title} : {palateRate}</label>
        <input 
          type="range"
          min="0" max={MAX_NUMBER.PARATES_RATE}
          step="0.1"
          name={title}
          className="block w-full py-2 mx-auto"
          value={palateRate}
          onChange={e => setPalateLevel(e.target.value)}
        />
        <span className="text-xs float-right mt-1">{rangeWarningText}</span>
      </div>
    </>
  )
}

export default PalateRateInput