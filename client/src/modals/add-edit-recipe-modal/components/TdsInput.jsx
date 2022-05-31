import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'

const TdsInput = ({recipe, setRecipe}) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setTds = (tds) => {
    if (tds.length === 0) {
      setRecipe({...recipe, tds: null});
      resetWarning();
    }
    else {
      setRecipe({...recipe, tds});

      const valueIsNumber = checkValueIsNumber(tds);
  
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
        const tdsIsInRange = checkNumberIsInRange(tds);
  
        if (!tdsIsInRange) {

          setWarning({
            ...warning,
            invalid: true,
            message: <span className="text-red">
              Please enter a number between 0.0 and 20.0.
            </span> 
          });
        }
        else {
          resetWarning();
        }
      }
    }
  }

  const checkValueIsNumber = (rate) => {
    const includesForbiddenChar = ["e", "E", "+", "-"].includes(rate);
    return !isNaN(rate) && !includesForbiddenChar;
  }

  const checkNumberIsInRange = (rate) => {
    return rate >= 0.0 && rate <= 20.0;
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
      title="TDS"
      type="text" 
      name="tds"
      autoComplete="off"
      placeholder="e.g. 9.51"
      value={recipe.tds}
      invalid={warning.invalid}
      onChange={e => setTds(e.target.value)}
      warningText={warning.message}
    />
  )
}

export default TdsInput