import React from 'react'
import { unescapeHtml } from '../../../utils/HtmlConverter'

const CoffeeAttributeSection = ({contentType, content, title}) => {
  const makeInnerHtml = () => {
    if (contentType === 'string') {
      return content !== null && content !== undefined && content !== '' ? unescapeHtml(content) : '-'
    }
    else if (contentType === 'array') {
      return content !== null && content !== undefined && content.length !== 0 ? content : '-'
    }
    else if (contentType === 'date') {
      return content !== null && content !== undefined && content !== '' ? content.split('T')[0] : '-'
    }
    else if (contentType === 'html') {
      return content !== null && content !== undefined && content !== '' ? content : '-'
    }
    return '-'
  }
  return (
    <div className="coffee-detail-section">
      <label className="font-medium mr-3">{title}</label>
      <div>{makeInnerHtml()}</div>
    </div>
  )
}

export default CoffeeAttributeSection