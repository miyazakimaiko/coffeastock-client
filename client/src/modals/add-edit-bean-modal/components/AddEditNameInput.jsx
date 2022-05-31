import React, { useEffect, useState } from 'react'
import FormInput from '../../../elements/FormInput';
import { escapeHtml } from '../../../helpers/HtmlConverter';

const AddEditNameInput = ({bean, setBean}) => {
  const [counter, setCounter] = useState(0);
  const [warning, setWarning] = useState({
    invalid: false,
    message: "* Required",
  });

  useEffect(() => {
    if (bean.label) {
      setCounter(escapeHtml(bean.label).length)
    }
  }, [bean.label])

  const setName = (inputValue) => {
    setBean({...bean, label: inputValue}); 

    const escapedValue = escapeHtml(inputValue);

    if (escapedValue.length === 0) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* Required</span>
      })
    } 
    else if (escapedValue.length > 60) {
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