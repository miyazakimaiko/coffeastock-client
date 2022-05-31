import React, { useState } from 'react'
import { capitalize, escapeHtml } from '../../../helpers/HtmlConverter'

const NameInput = ({rangeName, rangeItem, setRangeItem}) => {
  const [counter, setCounter] = useState(0);
  const [warning, setWarning] = useState({
    invalid: false,
    message: '',
  });

  const setName = (name) => {
    setRangeItem({...rangeItem, label: name});
    const encodedValue = escapeHtml(name);
    setCounter(encodedValue.length);

    if (encodedValue.length === 0) {
      setWarning({ 
        ...warning, 
        invalid: true,
        message: '* This field is required.',
      });
    }
    else if (encodedValue.length > 60) {
      setWarning({ 
        ...warning, 
        invalid: true,
        message: '* Please enter less than 60 letters.',
      });
    }
    else {
      setWarning({ 
        ...warning, 
        invalid: false,
        message: '',
      });
    }
  }

  return (
    <div className="form-section">
      <label className="font-medium mb-2">{capitalize(rangeName)} Name</label>
      <span className='ml-2 text-red text-xs'>{warning.message}</span>
      <input
        type="text" 
        name="label"
        autoComplete="off"
        placeholder="Name"
        className={
          `${warning.invalid ? 'red-outline' : 'blue-outline-transition'}  
          block w-full py-2 px-3 rounded`
        }
        value={rangeItem.label}
        onChange={(e) => setName(e.target.value)}
      />
      <div className='w-full mt-1 text-right'>
        <span>{counter}/60</span>
      </div>
    </div>
  )
}

export default NameInput