import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput';

const AddEditNameInput = ({bean, setBean}) => {
  const [counter, setCounter] = useState(0);
  const [warning, setWarning] = useState({
    invalid: false,
    message: "* Required",
  });

  const setName = (inputValue) => {
    setBean({...bean, label: inputValue}); 

    const nameIsValid = validateName(inputValue);

    if (nameIsValid) {
      setCounter(inputValue.length);

      if (inputValue.length === 0) {
        setWarning({
          ...warning,
          invalid: true,
          message: <span className="text-red">* Required</span>
        })
      } 
      else if (inputValue.length > 60) {
        setWarning({
          ...warning,
          invalid: true,
          message: <span className="text-red">
            Please enter less than 60 characters.
          </span>
        })
      } 
      else {
        setWarning({
          ...warning,
          invalid: false,
          message: ''
        })
      }
    }
    else {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">
          Special characters cannot be used.
        </span>
      });
    }
  }

  const validateName = (name) => {
    const banned = ['&', '<', '>', '"', "'", "`"];
    let includesBannedChar = false;
    banned.forEach(char => {
      if (name.includes(char)) includesBannedChar = true;
    })
    return !includesBannedChar;
  }

  return (
    <FormInput
      title="Name"
      type="text"
      name="label" 
      placeholder="e.g. Seasonal House Blend"
      value={bean.label}
      invalid={warning.invalid}
      onChange={e => setName(e.target.value)}
      warningText={warning.message}
      counterText={`${counter}/60`}
    />
  )
}

export default AddEditNameInput