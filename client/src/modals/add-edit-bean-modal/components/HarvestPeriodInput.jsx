import React, { useEffect, useState } from 'react'
import { escapeHtml } from '../../../helpers/HtmlConverter';
import FormInput from '../../../elements/FormInput';
import { checkHarvestPeriodIsInRange } from '../helpers/InputValidators';

const HarvestPeriodInput = ({bean, setBean}) => {
  const [counter, setCounter] = useState(0);
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  useEffect(() => {
    if (bean.harvest_period) {
      setCounter(escapeHtml(bean.harvest_period).length)
    }
  }, [bean.harvest_period])

  const setHarvestPeriod = (period) => {
    if (period.length === 0) {
      setBean({...bean, harvest_period: ""});
      clearWarning();
    }
    else {
      setBean({...bean, harvest_period: period});

      const valueIsInRange = checkHarvestPeriodIsInRange(period);
        
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

export default HarvestPeriodInput