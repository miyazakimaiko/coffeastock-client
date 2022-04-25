import React, { useState } from 'react'
import FormInput from '../../elements/FormInput'

const AddEditWaterTempInput = ({recipe, setRecipe}) => {

  const [tempWarningText, setTempWarningText] = useState("");

  const setTemp = (temp) => {
    if (temp < 0.0) {
      setTempWarningText(<span className="text-red">Please enter a positive number</span>)
    } else {
      setTempWarningText("")
    }
    if (temp.length === 0) {
      temp = null
    }
    setRecipe({...recipe, water_temp: temp})
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
      onChange={e => setTemp(e.target.value)}
      warningText={tempWarningText}
    />
  )
}

export default AddEditWaterTempInput