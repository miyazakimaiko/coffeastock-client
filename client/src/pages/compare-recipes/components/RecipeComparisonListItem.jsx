import React from 'react'

const RecipeComparisonListItem = ({ name, leftData, rightData }) => {
  return (
    <div className="recipe-conparison-section">
      <p>{leftData ?? '-'}</p>
      <div className="name">{name}</div>
      <p>{rightData ?? '-'}</p>
    </div>
  )
}

export default RecipeComparisonListItem