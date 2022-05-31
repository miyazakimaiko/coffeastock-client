import React from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const WaterInput = ({ rangeList, selectedWater, setSelectedWater }) => {
  const setWater = (selectedItem) => {
    setSelectedWater(selectedItem);
  };

  return (
    <FormMultiSelect
      title="Water"
      options={Object.values(rangeList.water_range)}
      value={selectedWater}
      onChange={setWater}
      isCreatable={true}
      isMulti={false}
    />
  );
};

export default WaterInput