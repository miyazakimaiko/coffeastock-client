import React from 'react'
import { unescapeHtml } from '../../helpers/HtmlConverter'

const CoffeeGroupSection = ({children, title}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm pt-8 pb-2 mb-8">
      <div className="flex items-center justify-center pt-4">
        <h2 className="text-xl text-center mb-4 font-medium">{unescapeHtml(title)}</h2>
      </div>
      <div className="flex mb-4 w-full flex-wrap justify-center">{children}</div>
    </div>
  )
}

export default CoffeeGroupSection