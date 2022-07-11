import React from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const WaterInput = ({ rangeList, selectedWater, setSelectedWater }) => {

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
      isCreatable={options.length > 150 ? false : true}
      isMulti={false}
    />
  );
};

export default WaterInput