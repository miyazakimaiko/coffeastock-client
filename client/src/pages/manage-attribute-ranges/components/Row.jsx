import { PencilAltIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { unescapeHtml } from '../../../utils/HtmlConverter'

const Row = ({category, value, label, def, onEditClick, onDeleteClick}) => {
  return (
    <tr id={`${category}-${value}`}>
      <td><p>{unescapeHtml(label)}</p></td>
      <td><p>{unescapeHtml(def)}</p></td>
      <td className="td-options">
        <button
          className="option-button"
          onClick={onEditClick}><PencilAltIcon className="icon text-green" />
        </button>
        <button
          type="button"
          className="option-button delete-button" 
          onClick={onDeleteClick}><XIcon className="icon text-red" />
        </button>
      </td>
    </tr>
  )
}

export default Row