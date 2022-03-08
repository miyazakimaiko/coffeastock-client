import React from 'react'
import { capitalize } from '../../utils/HtmlConverter'

const ToolBar = ({children, pageTitle}) => {
  return (
    <div className="h-16 flex items-center justify-center mb-8">
      {pageTitle
        ?      
        <h3 className="mr-3 text-xl text-center">
          {capitalize(pageTitle)}
        </h3>
        :
        null
    }
      {children}
    </div>
  )
}

export default ToolBar