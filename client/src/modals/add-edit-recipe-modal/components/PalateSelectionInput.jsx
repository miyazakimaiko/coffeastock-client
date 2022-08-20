import React from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const PalateSelectionInput = ({ rangeList, selectedPalates, setSelectedPalates }) => {

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
      isCreatable={options.length > 150 ? false : true}
      isMulti={true}
    />
  );
};

export default PalateSelectionInput