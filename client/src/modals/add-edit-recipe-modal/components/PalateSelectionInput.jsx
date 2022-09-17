import React from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const PalateSelectionInput = ({ rangeList, selectedPalates, setSelectedPalates, isCreatable }) => {


  const options = Object.values(rangeList.palate_range);

  const setPalates = (selectedItem) => {
    setSelectedPalates(selectedItem);
  };

  return (
    <FormMultiSelect
      title="Palates"
      options={options}
      value={selectedPalates}
      onChange={setPalates}
      isMulti={true}
      isCreatable={isCreatable}
    />
  );
};

export default PalateSelectionInput