import React, { useState } from 'react'
import { ImSpinner } from 'react-icons/im'
import FormInput from '../../../elements/FormInput'
import useUnits from '../../../hooks/useUnits';
import useUserUnitIds from '../../../hooks/useUserUnitIds';
import { checkValueIsNumber, checkWaterWeightIsInRange } from '../helpers/InputValidators';

const WaterWeightInput = ({recipe, setRecipe}) => {
  const { 
    data: units, 
    isLoading: unitsAreLoading 
  } = useUnits();

  const { 
    data: unitIds, 
    isLoading: unitIdsAreLoading 
  } = useUserUnitIds();

  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setWeight = (weight) => {
    if (weight.length === 0) {
      setRecipe({...recipe, water_weight: null});
      resetWarning();
    }
    else {
      setRecipe({...recipe, water_weight: weight});

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
        const weightIsInRange = checkWaterWeightIsInRange(weight);
  
        if (!weightIsInRange) {

          setWarning({
            ...warning,
            invalid: true,
            message: <span className="text-red">
              Please enter a number between 0.0 and 10000.0.
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

  if (unitsAreLoading || unitIdsAreLoading) {
    return <ImSpinner className="spnner"/>
  }

  return (
    <FormInput
      title={`Water Weight (${units['fluid' + unitIds['unit_fluid_weight_id']].short_label})`}
      type="text" 
      name="waterweight"
      autoComplete="off"
      placeholder="e.g. 200.5"
      value={recipe.water_weight}
      invalid={warning.invalid}
      onChange={e => setWeight(e.target.value)}
      warningText={warning.message}
    />
  )
}

export default WaterWeightInput