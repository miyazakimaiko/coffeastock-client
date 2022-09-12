import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'
import Spinner from '../../../elements/Spinner';
import useUnits from '../../../hooks/useUnits';
import useUserUnitIds from '../../../hooks/useUserUnitIds';
import ErrorPage from '../../../pages/error';
import { MAX_NUMBER } from '../../../utils/Constants';

const YieldWeightInput = ({recipe, setRecipe}) => {
  const { 
    data: units, 
    isLoading: unitsAreLoading,
    isError: unitsHaveError,
  } = useUnits();

  const { 
    data: unitIds, 
    isLoading: unitIdsAreLoading,
    isError: unitIdsHaveError,
  } = useUserUnitIds();

  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setWeight = (weight) => {
    if (weight.length === 0) {
      setRecipe({...recipe, yield_weight: null});
      resetWarning();
    }
    else {
      setRecipe({...recipe, yield_weight: weight});

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
        const weightIsInRange = checkNumberIsInRange(weight);
  
        if (!weightIsInRange) {

          setWarning({
            ...warning,
            invalid: true,
            message: <span className="text-red">
              Please enter a number between 0.0 and {MAX_NUMBER.RECIPES_YIELD_WEIGHT}.
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
    return number >= 0.0 && number <= 10000.0;
  }

  const resetWarning = () => {
    setWarning({
      ...warning,
      invalid: false,
      message: "",
    });
  }

  if (unitsAreLoading || unitIdsAreLoading) {
    return <Spinner />
  }

  if (unitsHaveError || unitIdsHaveError) {
    return <ErrorPage />
  }

  return (
    <FormInput
      title={`Yield Weight (${units['solid' + unitIds['unit_solid_weight_id']].short_label})`}
      type="text" 
      name="yieldweight"
      autoComplete="off"
      placeholder="e.g. 200.5"
      value={recipe.yield_weight}
      invalid={warning.invalid}
      onChange={e => setWeight(e.target.value)}
      warningText={warning.message}
    />
  )
}

export default YieldWeightInput