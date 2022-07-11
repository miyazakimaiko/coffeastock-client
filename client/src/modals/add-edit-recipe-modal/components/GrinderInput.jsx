import React from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const GrinderInput = ({ rangeList, selectedGrinder, setSelectedGrinder }) => {

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
      isCreatable={options.length > 150 ? false : true}
      isMulti={false}
    />
  );
};

export default GrinderInput