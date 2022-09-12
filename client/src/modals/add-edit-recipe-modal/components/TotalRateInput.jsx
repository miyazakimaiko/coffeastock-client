import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput';
import { MAX_NUMBER } from '../../../utils/Constants';

const TotalRateInput = ({recipe, setRecipe}) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setRate = (rate) => {
    if (rate.length === 0) {
      setRecipe({...recipe, total_rate: null});
      resetWarning();
    }
    else {
      setRecipe({...recipe, total_rate: rate});

      const valueIsNumber = checkValueIsNumber(rate);
  
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
        const rateIsInRange = checkNumberIsInRange(rate);
  
        if (!rateIsInRange) {

          setWarning({
            ...warning,
            invalid: true,
            message: <span className="text-red">
              Please enter a number between 0.0 and {MAX_NUMBER.RECIPES_TOTAL_RATE}.
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
    return rate >= 0.0 && rate <= MAX_NUMBER.RECIPES_TOTAL_RATE;
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
      title={`Total Rate (0.0-${MAX_NUMBER.RECIPES_TOTAL_RATE})`}
      type="text"
      name="totalRate"
      placeholder="e.g. 85.5"
      value={recipe.total_rate}
      invalid={warning.invalid}
      onChange={e => setRate(e.target.value)}
      warningText={warning.message}
    />
  )
}

export default TotalRateInput