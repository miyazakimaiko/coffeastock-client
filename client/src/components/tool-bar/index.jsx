import React from 'react'
import { capitalize } from '../../utils/HtmlConverter'

const ToolBar = ({children, pageTitle = null, titleHtml = null}) => {
  return (
    <div className="h-16 flex items-center justify-center mb-8">
      {pageTitle || titleHtml
        ?      
        <h3 className="mr-3 text-xl text-center">
          {pageTitle ? capitalize(pageTitle) : null}
          {titleHtml}
        </h3>
        :
        null
    }
      {children}
    </div>
  )
}

export default ToolBar