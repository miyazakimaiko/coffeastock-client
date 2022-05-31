import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'

const TdsInput = ({recipe, setRecipe}) => {

  const [tdsWarningText, setTdsWarningText] = useState("");

  const setTds = (tds) => {
    if (tds < 0.0) {
      setTdsWarningText(<span className="text-red">Please enter a positive number</span>)
    } else {
      setTdsWarningText("")
    }
    if (tds.length === 0) {
      tds = null
    }
    setRecipe({...recipe, tds})
  }

  return (
    <FormInput
      title="TDS"
      type="number" 
      step="0.01" 
      name="tds"
      autoComplete="off"
      placeholder="e.g. 9.51"
      value={recipe.tds}
      onChange={e => setTds(e.target.value)}
      warningText={tdsWarningText}
    />
  )
}

export default TdsInput