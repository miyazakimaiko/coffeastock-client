import React from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const GrinderInput = ({ rangeList, selectedGrinder, setSelectedGrinder }) => {
  const setGrinder = (selectedItem) => {
    setSelectedGrinder(selectedItem);
  };

  return (
    <FormMultiSelect
      title="Grinder"
      options={Object.values(rangeList.grinder_range)}
      value={selectedGrinder}
      onChange={setGrinder}
      isCreatable={true}
      isMulti={false}
    />
  );
};

export default GrinderInput