import React, { useState } from 'react'
import FormInput from '../../elements/FormInput';

const AddEditNameInput = ({bean, setBean}) => {
  const [nameWarningText, setNameWarningText] = useState("* Required");

  const setName = (inputValue) => {
    const banned = ['&', '<', '>', '"', "'"];
    let includesBannedChar = false;
    banned.forEach(char => {
      if (inputValue.includes(char)) includesBannedChar = true;
    })
    if (inputValue.length === 0) {
      setNameWarningText(<span className="text-red">* Required</span>);
    } else if (includesBannedChar) {
      setNameWarningText(<span className="text-red">Special characters cannot be used.</span>)
    }
    else if (inputValue.length > 60) {
      setNameWarningText(<span className="text-red">{60 - inputValue.length}/60</span>);
    } 
    else {
      setNameWarningText(`${60 - inputValue.length}/60`);
    }
    setBean({...bean, label: inputValue});  
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