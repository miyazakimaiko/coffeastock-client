import React, { useState } from 'react'
import FormInput from '../../elements/FormInput'

const AddEditRoastLevelInput = ({bean, setBean}) => {

  const [roastLevelWarningText, setRoastLevelWarningText] = useState("");

  const setRoastLevel = (level) => {
    if (level < 0.0 || level > 10.0) {
      setRoastLevelWarningText(<span className="text-red">Please enter a number between 0.0 and 10.0</span>)
    } else {
      setRoastLevelWarningText("")
    }
    setBean({...bean, roast_level: level})
  }

  return (
    <FormInput
      title="Roast Level (0.0 - 10.0)"
      type="number" 
      step="0.1" 
      name="roastlevel"
      autoComplete="off"
      placeholder="e.g. 6.5"
      value={bean.roast_level}
      onChange={e => setRoastLevel(e.target.value)}
      warningText={roastLevelWarningText}
    />
  )
}

export default AddEditRoastLevelInput