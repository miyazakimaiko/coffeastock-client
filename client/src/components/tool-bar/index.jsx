import React from 'react'

const ToolBar = ({children, pageTitle}) => {
  return (
    <div className="h-16 flex items-center justify-center mb-8">
      <h3 className="mr-3 text-xl text-center">
        {pageTitle}
      </h3>
      {children}
    </div>
  )
}

export default ToolBar