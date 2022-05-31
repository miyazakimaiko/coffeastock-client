import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'

const WaterWeightInput = ({recipe, setRecipe}) => {

  const [weightWarningText, setWeightWarningText] = useState("");

  const setWeight = (weight) => {
    if (weight < 0.0) {
      setWeightWarningText(<span className="text-red">Please enter a positive number</span>)
    } else {
      setWeightWarningText("")
    }
    if (weight.length === 0) {
      weight = null
    }
    setRecipe({...recipe, water_weight: weight})
  }

  return (
    <FormInput
      title="Water Weight"
      type="number" 
      step="0.1" 
      name="waterweight"
      autoComplete="off"
      placeholder="e.g. 200.5"
      value={recipe.water_weight}
      onChange={e => setWeight(e.target.value)}
      warningText={weightWarningText}
    />
  )
}

export default WaterWeightInput