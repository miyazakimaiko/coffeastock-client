import React from 'react';
import { capitalize } from '../../helpers/HtmlConverter';

const ToolBar = ({children, pageTitle = null, titleHtml = null}) => {
  return (
    <div className="flex items-center justify-center flex-wrap">
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