import React from 'react'
import { unescapeHtml } from '../../../helpers/HtmlConverter'
import Dropdown from '../../../elements/Dropdown'

const Row = ({category, value, label, def, onEditClick, onDeleteClick}) => {
  return (
    <tr id={`${category}-${value}`}>
      <td style={{'width': '25%'}}><p>{unescapeHtml(label)}</p></td>
      <td><p>{unescapeHtml(def)}</p></td>
      <td className="justify-end" style={{'width': '5%'}}>
        <Dropdown dropdownText="" type="dot">
          <div className="dropdown-content" >
            <button
              className="option-button dropdown-item"
              onClick={onEditClick}>
                Edit
            </button>
            <button
              type="button"
              className="option-button delete-button dropdown-item" 
              onClick={onDeleteClick}>
                Delete
            </button>
          </div>
        </Dropdown>
      </td>
    </tr>
  )
}

export default Row