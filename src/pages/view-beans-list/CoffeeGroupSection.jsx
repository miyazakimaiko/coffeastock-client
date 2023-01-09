import React from 'react'
import { unescapeHtml } from '../../helpers/HtmlConverter'

const CoffeeGroupSection = ({children, title}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm py-2 mb-8">
      <div className="flex items-center justify-center pt-6 pb-2">
        <h2 className="text-2xl font-medium">{unescapeHtml(title)}</h2>
      </div>
      <div className="flex mb-4 w-full flex-wrap justify-start">{children}</div>
    </div>
  )
}

export default CoffeeGroupSection