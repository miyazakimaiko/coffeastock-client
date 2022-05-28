import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput';
import { escapeHtml } from '../../../helpers/HtmlConverter';

const AddEditAltitudeInput = ({bean, setBean}) => {
  const [counter, setCounter] = useState(0);
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setAltitude = (altitude) => {
    if (altitude.length === 0) {
      setBean({...bean, altitude: null});
      setCounter(0);
      clearWarning();
    }
    else {      
      setBean({...bean, altitude});

      const encodedValue = escapeHtml(altitude);
      setCounter(encodedValue.length);
  
      if (encodedValue.length > 60) {
        setWarning({
          ...warning,
          invalid: true,
          message: <span className="text-red">
            Please enter less than 60 letters.
          </span>
        });
      } else {
        clearWarning();
      }
    }
  }

  const clearWarning = () => {
    setWarning({
      ...warning,
      invalid: false,
      message: ''
    });
  }

  return (
    <FormInput
      title="Altitude"
      type="text" 
      name="altitude"
      placeholder="e.g. 4000 MASL"
      value={bean.altitude}
      invalid={warning.invalid}
      onChange={e => setAltitude(e.target.value)}
      warningText={warning.message}
      counterText={`${counter}/60`}
    />
  )
}

export default AddEditAltitudeInput