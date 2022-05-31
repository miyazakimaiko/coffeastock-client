import React, { useState } from 'react'
import { capitalize } from '../../../helpers/HtmlConverter'

const DetailsTextarea = ({rangeName, rangeItem, setRangeItem}) => {
  const [counter, setCounter] = useState(0)
  const [warning, setWarning] = useState({
    invalid: false,
    message: '',
  });

  const setDetails = (e) => {
    setRangeItem({...rangeItem, def: e.target.value});
    setCounter(e.target.value.length);

    if (e.target.value.length > 600) {
      setWarning({ 
        ...warning, 
        invalid: true,
        message: '* Please enter less than 600 letters.',
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
      <label className="font-medium">{capitalize(rangeName)} Details</label>
      <span className='ml-2 text-red text-xs'>{warning.message}</span>
      <textarea 
        type="text" 
        name="definition"
        autoComplete="off"
        placeholder="Details" 
        className={
          `${warning.invalid ? 'red-outline' : 'blue-outline-transition'}  
          block w-full h-44 py-2 px-3 rounded`
        }
        value={rangeItem.def}
        onChange={setDetails}
      />
      <div className='w-full mt-1 text-right'>
        <span>{counter}/600</span>
      </div>
    </div>
  )
}

export default DetailsTextarea