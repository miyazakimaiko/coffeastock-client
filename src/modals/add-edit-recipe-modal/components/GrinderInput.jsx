import React from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const GrinderInput = ({ rangeList, selectedGrinder, setSelectedGrinder, isCreatable }) => {

  const options = Object.values(rangeList.grinder_range);

  const setGrinder = (selectedItem) => {
    setSelectedGrinder(() => [selectedItem]);
  };

  return (
    <FormMultiSelect
      title="Grinder"
      options={options}
      value={selectedGrinder}
      onChange={setGrinder}
      isMulti={false}
      isCreatable={isCreatable}
    />
  );
};

export default GrinderInput