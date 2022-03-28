import React, { useState } from 'react'
import FormInput from '../../elements/FormInput';

const AddEditTotalRateInput = ({recipe, setRecipe}) => {

  const [rateWarningText, setRateWarningText] = useState("");

  const setRate = (rate) => {
    setRecipe({...recipe, total_rate: rate});
    if (rate < 0.0 || rate > 100.0) {
      setRateWarningText(<span className="text-red">Please enter a number between 0.0 and 100.0</span>)
    } else {
      setRateWarningText("")
    }
  }

  return (
    <FormInput
      title="Total Rate (0.0 - 100.0)"
      type="number"
      step="0.1"
      name="totalRate"
      placeholder="e.g. 85.5"
      value={recipe.total_rate}
      onChange={e => setRate(e.target.value)}
      warningText={rateWarningText}
    />
  )
}

export default AddEditTotalRateInput