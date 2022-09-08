import React, { useEffect, useState } from 'react'
import FormInput from '../../../elements/FormInput';
import { escapeHtml } from '../../../helpers/HtmlConverter';
import { checkAltitudeIsInRange } from '../helpers/InputValidators';

const AltitudeInput = ({bean, setBean}) => {
  const [counter, setCounter] = useState(0);
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  useEffect(() => {
    if (bean.altitude) {
      setCounter(escapeHtml(bean.altitude).length)
    }
    setAltitude(bean.altitude);
  }, [bean.altitude])

  const setAltitude = (altitude) => {
    if (!Boolean(altitude) || altitude.length === 0) {
      setBean(bean => ({...bean, altitude: ""}));
      clearWarning();
    }
    else {      
      setBean(bean => ({...bean, altitude}));
  
      const valueIsInRange = checkAltitudeIsInRange(altitude);

      if (!valueIsInRange) {
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

export default AltitudeInput