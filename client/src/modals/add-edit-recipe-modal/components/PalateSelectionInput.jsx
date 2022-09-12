import React from 'react'
import { useUserData } from '../../../context/AccountContext';
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT, USER_TYPE_KEY } from '../../../utils/Constants';

const PalateSelectionInput = ({ rangeList, selectedPalates, setSelectedPalates }) => {

  const user = useUserData();

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
      isCreatable={options.length > MAX_COUNT.RANGES[user[USER_TYPE_KEY]]}
      isMulti={true}
    />
  );
};

export default PalateSelectionInput