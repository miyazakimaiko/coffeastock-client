import React, { useState } from 'react'
import { escapeHtml } from '../../../helpers/HtmlConverter';
import FormInput from '../../../elements/FormInput';

const AddEditHarvestPeriodInput = ({bean, setBean}) => {
  const [counter, setCounter] = useState(0);
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setHarvestPeriod = (period) => {
    if (period.length === 0) {
      setBean({...bean, harvest_period: null});
      setCounter(0);
      clearWarning();
    }
    else {
      setBean({...bean, harvest_period: period});

      const encodedValue = escapeHtml(period);
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
      title="Harvest Period"
      type="text" 
      name="harvest-period"
      placeholder="e.g. Sep 2020" 
      value={bean.harvest_period}
      invalid={warning.invalid}
      onChange={e => setHarvestPeriod(e.target.value)}
      warningText={warning.message}
      counterText={`${counter}/60`}
    />
  )
}

export default AddEditHarvestPeriodInput