import React, { useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT } from '../../../utils/Constants';

const PalateSelectionInput = ({ rangeList, selectedPalates, setSelectedPalates, isCreatable }) => {


  const options = Object.values(rangeList.palate_range);

  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setPalates = (palateList) => {
    setSelectedPalates(palateList);

    if (palateList.length > MAX_COUNT.RECIPE.PALATE) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* Cannot select more than {MAX_COUNT.RECIPE.PALATE} items.</span>,
      });
    } 
    else {
      setWarning({
        ...warning,
        invalid: false,
        message: "",
      });
    }
  };

  return (
    <FormMultiSelect
      title="Palates"
      options={options}
      value={selectedPalates}
      onChange={setPalates}
      isMulti={true}
      invalid={warning.invalid}
      warningText={warning.message}
      isCreatable={isCreatable}
    />
  );
};

export default PalateSelectionInput