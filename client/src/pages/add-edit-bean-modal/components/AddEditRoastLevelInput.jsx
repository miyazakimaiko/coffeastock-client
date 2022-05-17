import React, { useState } from 'react'
import FormInput from '../../../components/elements/FormInput'

const AddEditRoastLevelInput = ({bean, setBean}) => {

  const [roastLevelWarningText, setRoastLevelWarningText] = useState("");

  const setRoastLevel = (level) => {
    const gradeWithinRange = level >=  0.0 && level <= 10.0
    if (!gradeWithinRange) {
      setRoastLevelWarningText(<span className="text-red">Please enter a number between 0.0 and 10.0</span>)
    } else {
      if (level.length === 0) {
        level = null
      }
      setBean({...bean, roast_level: level})
      setRoastLevelWarningText("")
    }
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
      onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
      onChange={e => setRoastLevel(e.target.value)}
      warningText={roastLevelWarningText}
    />
  )
}

export default AddEditRoastLevelInput