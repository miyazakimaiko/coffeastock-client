import React from 'react'
import { useUserData } from '../../../context/AccountContext';
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT, USER_TYPE_KEY } from '../../../utils/Constants';

const GrinderInput = ({ rangeList, selectedGrinder, setSelectedGrinder }) => {

  const user = useUserData();

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
      isCreatable={options.length < MAX_COUNT.RANGES[user[USER_TYPE_KEY]]}
      isMulti={false}
    />
  );
};

export default GrinderInput