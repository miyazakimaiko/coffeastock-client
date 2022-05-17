import React, { useState } from 'react'
import FormInput from '../../../components/elements/FormInput';

const AddEditNameInput = ({bean, setBean}) => {
  const [nameWarningText, setNameWarningText] = useState("* Required");

  const setName = (inputValue) => {
    const banned = ['&', '<', '>', '"', "'"];
    let includesBannedChar = false;
    banned.forEach(char => {
      if (inputValue.includes(char)) includesBannedChar = true;
    })
    if (!includesBannedChar) {
      setBean({...bean, label: inputValue});  

      if (inputValue.length === 0) {
        setNameWarningText(<span className="text-red">* Required</span>);
      } 
      else if (inputValue.length > 60) {
        setNameWarningText(<span className="text-red">{60 - inputValue.length}/60</span>);
      } 
      else {
        setNameWarningText(`${60 - inputValue.length}/60`);
      }
    }
    else {
      setNameWarningText(<span className="text-red">Special characters cannot be used.</span>)
    }
  }

  return (
    <FormInput
      title="Name"
      type="text"
      name="label" 
      placeholder="e.g. Seasonal House Blend"
      value={bean.label}
      onChange={e => setName(e.target.value)}
      warningText={nameWarningText}
    />
  )
}

export default AddEditNameInput