import React, { useState } from 'react'
import FormTextarea from '../../../elements/FormTextarea';
import { escapeHtml } from '../../../helpers/HtmlConverter';

const AddEditMemoTextarea = ({bean, setBean}) => {
  const [counter, setCounter] = useState(0);
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setMemo = (memo) => {
    if (memo.length === 0) {
      setBean({...bean, memo: null});
      setCounter(0);
      clearWarning();
    }
    else {
      setBean({...bean, memo});
    
      const encodedValue = escapeHtml(memo);
      setCounter(encodedValue.length);
  
      if (encodedValue.length > 400) {
        setWarning({
          ...warning,
          invalid: true,
          message: <span className="text-red">
            Please enter less than 400 letters.
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
    <FormTextarea
      title="Memo"
      name="memo"
      value={bean.memo}
      invalid={warning.invalid}
      onChange={e => setMemo(e.target.value)}
      warningText={warning.message}
      counterText={`${counter}/400`}
    />
  )
}

export default AddEditMemoTextarea