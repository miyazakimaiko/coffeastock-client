import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'

const AddEditYieldWeightInput = ({recipe, setRecipe}) => {

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
    setRecipe({...recipe, yield_weight: weight})
  }

  return (
    <FormInput
      title="Yield Weight"
      type="number" 
      step="0.1" 
      name="yieldweight"
      autoComplete="off"
      placeholder="e.g. 200.5"
      value={recipe.yield_weight}
      onChange={e => setWeight(e.target.value)}
      warningText={weightWarningText}
    />
  )
}

export default AddEditYieldWeightInput