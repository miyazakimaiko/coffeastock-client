import React, { useState } from 'react'
import { capitalize } from '../../../helpers/HtmlConverter'
import { MAX_LENGTH } from '../../../utils/Constants';

const DetailsTextarea = ({rangeName, rangeItem, setRangeItem}) => {
  const [counter, setCounter] = useState(0)
  const [warning, setWarning] = useState({
    invalid: false,
    message: '',
  });

  const setDetails = (e) => {
    setRangeItem({...rangeItem, def: e.target.value});
    setCounter(e.target.value.length);

    if (e.target.value.length > MAX_LENGTH.RANGES_DEFINITION) {
      setWarning({ 
        ...warning, 
        invalid: true,
        message: `* Please enter less than ${MAX_LENGTH.RANGES_DEFINITION} letters.`,
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
        <span>{counter}/{MAX_LENGTH.RANGES_DEFINITION}</span>
      </div>
    </div>
  )
}

export default DetailsTextarea