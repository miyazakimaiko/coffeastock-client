import React from 'react'
import { unescapeHtml } from '../../utils/HtmlConverter'

const CoffeeGroupSection = ({children, title}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm pb-8 mb-8">
      <div className="h-36 flex items-center justify-center pt-4">
        <h2 className="text-xl text-center ">{unescapeHtml(title)}</h2>
      </div>
      <div className="flex mb-4 w-full flex-wrap justify-center">{children}</div>
    </div>
  )
}

export default CoffeeGroupSection