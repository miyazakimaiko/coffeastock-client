import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput'

const AddEditRoastLevelInput = ({bean, setBean}) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setRoastLevel = (level) => {
    if (level.length === 0) {
      setBean({...bean, roast_level: null});
      resetWarning();
    }
    else {
      setBean({...bean, roast_level: level});

      const valueIsNumber = checkValueIsNumber(level);

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
        const numberIsInRange = checkNumberIsInRange(level);

        if (!numberIsInRange) {
          setWarning({
            ...warning,
            invalid: true,
            message: <span className="text-red">
              Please enter a number between 0.0 and 10.0.
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

  const checkValueIsNumber = (value) => {
    const includesForbiddenChar = ["e", "E", "+", "-"].includes(value);
    return !isNaN(value) && !includesForbiddenChar;
  }

  const checkNumberIsInRange = (number) => {
    return number >= 0.0 && number <= 100.0;
  }

  return (
    <FormInput
      title="Roast Level (0.0 - 10.0)"
      type="text" 
      name="roastlevel"
      autoComplete="off"
      placeholder="e.g. 6.5"
      value={bean.roast_level}
      invalid={warning.invalid}
      onChange={e => setRoastLevel(e.target.value)}
      warningText={warning.message}
    />
  )
}

export default AddEditRoastLevelInput