import React, { useState } from 'react'
import FormInput from '../../elements/FormInput'

const AddEditPalateRangeInput = ({title, parateId, palateRate, setPalateRate}) => {
  console.log('parateId: ', parateId)
  console.log('parateRate[parateId]: ', palateRate[parateId])
  const [rangeWarningText, setRangeWarningText] = useState("");

  const setPalateLevel = (level) => {
    if (level < 0.0) {
      setRangeWarningText(<span className="text-red">Please enter a positive number</span>)
    } else {
      setRangeWarningText("")
    }
    setPalateRate(parateId, level)
  }

  return (

    <>
      <div className="form-section w-1/2 md:w-1/4">
        <label className="font-medium">{title} : {palateRate[parateId]}</label>
        <input 
          type="range"
          min="0" max="10"
          step="0.5"
          name={title}
          className="block w-full py-2 mx-auto"
          value={palateRate[parateId]}
          onChange={e => setPalateLevel(e.target.value)}
        />
        <span className="text-xs float-right mt-1">{rangeWarningText}</span>
      </div>

    </>
  )
}

export default AddEditPalateRangeInput