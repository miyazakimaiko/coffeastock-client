import React from 'react'
import FormInput from '../../../elements/FormInput';

const BrewingDateInput = ({ recipe, setRecipe }) => {
  const setDate = (e) => {
    setRecipe(recipe => ({ ...recipe, brew_date: e.target.value }))
  };

  return (
    <FormInput
      title="Brewing Date"
      type="date"
      name="brewingdate"
      value={recipe.brew_date}
      onChange={setDate}
    />
  );
};

export default BrewingDateInput