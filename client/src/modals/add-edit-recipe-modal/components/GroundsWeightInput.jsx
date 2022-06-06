import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'
import { checkGroundsWeightIsInRange, checkValueIsNumber } from '../helpers/InputValidators';

const GroundsWeightInput = ({recipe, setRecipe}) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setWeight = (weight) => {
    if (weight.length === 0) {
      setRecipe({...recipe, grounds_weight: null});
      resetWarning();
    }
    else {
      setRecipe({...recipe, grounds_weight: weight});

      const valueIsNumber = checkValueIsNumber(weight);
  
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
        const weightIsInRange = checkGroundsWeightIsInRange(weight);
  
        if (!weightIsInRange) {

          setWarning({
            ...warning,
            invalid: true,
            message: <span className="text-red">
              Please enter a number between 0.0 and 1000.0.
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
      title="Grounds Weight (g)"
      type="text" 
      name="groundsweight"
      autoComplete="off"
      placeholder="e.g. 18.5"
      value={recipe.grounds_weight}
      invalid={warning.invalid}
      onChange={e => setWeight(e.target.value)}
      warningText={warning.message}
    />
  )
}

export default GroundsWeightInput