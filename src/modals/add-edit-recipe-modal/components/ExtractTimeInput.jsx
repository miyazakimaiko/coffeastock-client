import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'

const ExtractTimeInput = ({recipe, setRecipe}) => {

  const [timeWarningText, setTimeWarningText] = useState("");

  const setTime = (time) => {
    if (time < 0.0) {
      setTimeWarningText(<span className="text-red">Please enter a positive number</span>)
    } else {
      setTimeWarningText("")
    }
    if (time.length === 0) {
      time = null
    }
    setRecipe({...recipe, extraction_time: time})
  }

  return (
    <FormInput
      title="Extraction Time"
      type="time" 
      name="extracttime"
      step="1"
      value={recipe.extraction_time}
      onChange={e => {setTime(e.target.value)}}
      warningText={timeWarningText}
    />
  )
}

export default ExtractTimeInput