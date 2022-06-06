import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'
import { checkGrindSizeIsInRange, checkValueIsNumber } from '../helpers/InputValidators';

const GrindSizeInput = ({recipe, setRecipe}) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setGrindSize = (grindSize) => {
    if (grindSize.length === 0) {
      setRecipe({...recipe, grind_size: null});
      resetWarning();
    }
    else {
      setRecipe({...recipe, grind_size: grindSize});

      const valueIsNumber = checkValueIsNumber(grindSize);
  
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
        const gradeIsInRange = checkGrindSizeIsInRange(grindSize);
  
        if (!gradeIsInRange) {

          setWarning({
            ...warning,
            invalid: true,
            message: <span className="text-red">
              Please enter a number between 0.0 and 100.0.
            </span> 
          });
        }
        else {
          resetWarning();
        }
      }
    }
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
      title="Grind Size"
      type="text"
      name="grindsize"
      placeholder="e.g. 11.5"
      value={recipe.grind_size}
      invalid={warning.invalid}
      onChange={e => setGrindSize(e.target.value)}
      warningText={warning.message}
    />
  )
}

export default GrindSizeInput