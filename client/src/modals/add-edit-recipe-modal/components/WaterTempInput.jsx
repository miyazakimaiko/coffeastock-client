import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'

const WaterTempInput = ({recipe, setRecipe}) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const [tempWarningText, setTempWarningText] = useState("");

  const setTemp = (temp) => {
    if (temp.length === 0) {
      setRecipe({...recipe, water_temp: null});
      resetWarning();
    }
    else {
      setRecipe({...recipe, water_temp: temp});

      const valueIsNumber = checkValueIsNumber(temp);
  
      if (!valueIsNumber) {
        
        setWarning({
          ...warning,
          invalid: true,
          message: <span className="text-red">
            Value must be a number.
          </span>
        });
      }
      else {
        const tempIsInRange = checkNumberIsInRange(temp);
  
        if (!tempIsInRange) {

          setWarning({
            ...warning,
            invalid: true,
            message: <span className="text-red">
              Please enter a number between 0.0 and 212.0.
            </span> 
          });
        }
        else {
          resetWarning();
        }
      }
    }
  }

  const checkValueIsNumber = (value) => {
    const includesForbiddenChar = ["e", "E", "+", "-"].includes(value);
    return !isNaN(value) && !includesForbiddenChar;
  }

  const checkNumberIsInRange = (number) => {
    return number >= 0.0 && number <= 212.0;
  }

  const resetWarning = () => {
    setWarning({
      ...warning,
      invalid: false,
      message: "",
    });
  }

  return (
    <FormInput
      title="Water Temperature (Celsius)"
      type="text" 
      name="watertemp"
      autoComplete="off"
      placeholder="e.g. 90.5"
      value={recipe.water_temp}
      invalid={warning.invalid}
      onChange={e => setTemp(e.target.value)}
      warningText={tempWarningText}
    />
  )
}

export default WaterTempInput