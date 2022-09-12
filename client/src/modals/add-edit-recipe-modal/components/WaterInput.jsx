import React from 'react'
import { useUserData } from '../../../context/AccountContext';
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT, USER_TYPE_KEY } from '../../../utils/Constants';

const WaterInput = ({ rangeList, selectedWater, setSelectedWater }) => {

  const user = useUserData();

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
      isCreatable={options.length < MAX_COUNT.RANGES[user[USER_TYPE_KEY]]}
      isMulti={false}
    />
  );
};

export default WaterInput