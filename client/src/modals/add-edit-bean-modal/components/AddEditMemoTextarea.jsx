import React, { useState } from 'react'
import FormTextarea from '../../../elements/FormTextarea';
import { escapeHtml } from '../../../helpers/HtmlConverter';

const AddEditMemoTextarea = ({bean, setBean}) => {

  const [memoWarningText, setMemoWarningText] = useState("400/400");

  const setMemo = (memo) => {
    const encoded = escapeHtml(memo);
    if (encoded.length > 400) {
      setMemoWarningText(<span className="text-red">{400 - encoded.length}/400</span>)
    } else {
      setMemoWarningText(`${400 - encoded.length}/400`)
    }
    if (memo.length === 0) {
      memo = null
    }
    setBean({...bean, memo})
  }
  return (
    <FormTextarea
      title="Memo"
      name="memo"
      value={bean.memo}
      onChange={e => setMemo(e.target.value)}
      warningText={memoWarningText}
    />
  )
}

export default AddEditMemoTextarea