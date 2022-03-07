import React from 'react'
import FormTextarea from '../../elements/FormTextarea';
import { escapeHtml } from '../../../utils/HtmlConverter';

const AddEditMemoTextarea = ({bean, setBean, memoWarningText, setMemoWarningText}) => {
  const setMemo = (memo) => {
    const encoded = escapeHtml(memo);
    if (encoded.length > 400) {
      setMemoWarningText(<span className="text-red">{400 - encoded.length}/400</span>)
    } else {
      setMemoWarningText(`${400 - encoded.length}/400`)
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