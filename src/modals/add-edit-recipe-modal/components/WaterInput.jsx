import React from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const WaterInput = ({ rangeList, selectedWater, setSelectedWater, isCreatable }) => {

  const options = Object.values(rangeList.water_range);

  const setWater = (selectedItem) => {
    setSelectedWater(() => [selectedItem]);
  };

  return (
    <FormMultiSelect
      title="Water"
      options={options}
      value={selectedWater}
      onChange={setWater}
      isMulti={false}
      isCreatable={isCreatable}
    />
  );
};

export default WaterInput