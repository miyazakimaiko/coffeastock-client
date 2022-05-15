import React, { useState } from 'react'
import FormInput from '../../../components/elements/FormInput'

const AddEditGroundsWeightInput = ({recipe, setRecipe}) => {

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
    setRecipe({...recipe, grounds_weight: weight})
  }

  return (
    <FormInput
      title="Grounds Weight"
      type="number" 
      step="0.1" 
      name="groundsweight"
      autoComplete="off"
      placeholder="e.g. 18.5"
      value={recipe.grounds_weight}
      onChange={e => setWeight(e.target.value)}
      warningText={weightWarningText}
    />
  )
}

export default AddEditGroundsWeightInput