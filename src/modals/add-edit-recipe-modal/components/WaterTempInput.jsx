import React, { useMemo, useState } from 'react'
import FormInput from '../../../elements/FormInput'
import Spinner from '../../../elements/Spinner';
import useUnits from '../../../hooks/useUnits';
import useUserInfo from '../../../hooks/useUserInfo';
import ErrorPage from '../../../pages/error';
import { MAX_TEMP } from '../../../utils/Constants';

const WaterTempInput = ({recipe, setRecipe}) => {
  const { 
    data: units, 
    isLoading: unitsAreLoading,
    isError: unitsHaveError,
  } = useUnits();

  const { 
    data: userInfo, 
    isLoading: userInfoAreLoading,
    isError: userInfoHaveError,
  } = useUserInfo();

  const unitLabel = useMemo(() => {
    if (Boolean(units) && Boolean(userInfo))
      return units['temp' + userInfo.unit_temperature_id].label.toUpperCase();
  }, [units, userInfo])

  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

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
              Please enter a number between 0.0 and {MAX_TEMP[unitLabel]}.
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
    return number >= 0.0 && number <= MAX_TEMP[unitLabel];
  }

  const resetWarning = () => {
    setWarning({
      ...warning,
      invalid: false,
      message: "",
    });
  }

  if (unitsAreLoading || userInfoAreLoading) {
    return <Spinner />
  }

  if (unitsHaveError || userInfoHaveError) {
    return <ErrorPage />
  }

  return (
    <FormInput
      title={`Water Temperature (${units['temp' + userInfo.unit_temperature_id].short_label})`}
      type="text" 
      name="watertemp"
      autoComplete="off"
      placeholder={`e.g. ${(MAX_TEMP[unitLabel] * 0.972).toFixed(1)}`}
      value={recipe.water_temp}
      invalid={warning.invalid}
      onChange={e => setTemp(e.target.value)}
      warningText={warning.message}
    />
  )
}

export default WaterTempInput