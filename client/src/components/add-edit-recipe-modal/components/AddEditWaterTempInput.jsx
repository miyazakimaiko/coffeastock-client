import React, { useState } from 'react'
import FormInput from '../../elements/FormInput'

const AddEditWaterTempInput = ({recipe, setRecipe}) => {

  const [tempWarningText, setTempWarningText] = useState("");

  const setWeight = (weight) => {
    if (weight < 0.0) {
      setTempWarningText(<span className="text-red">Please enter a positive number</span>)
    } else {
      setTempWarningText("")
    }
    setRecipe({...recipe, water_temp: weight})
  }

  return (
    <FormInput
      title="Water Temperature"
      type="number" 
      step="0.1" 
      name="watertemp"
      autoComplete="off"
      placeholder="e.g. 90.5"
      value={recipe.water_temp}
      onChange={e => setWeight(e.target.value)}
      warningText={tempWarningText}
    />
  )
}

export default AddEditWaterTempInput