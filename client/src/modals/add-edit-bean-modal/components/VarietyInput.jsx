import React, { useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT } from '../../../utils/Constants';

const VarietyInput = ({ rangeList, selectedVariety, setSelectedVariety, isCreatable }) => {


  const options = Object.values(rangeList.variety_range);

  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setVarietyList = (varietyList) => {
    setSelectedVariety(varietyList);

    if (varietyList.length > MAX_COUNT.BEANS.VARIETY) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* Cannot select more than {MAX_COUNT.BEANS.VARIETY} varietals.</span>,
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
      title="Variety"
      options={options}
      value={selectedVariety}
      invalid={warning.invalid}
      onChange={setVarietyList}
      warningText={warning.message}
      isCreatable={isCreatable}
    />
  );
};

export default VarietyInput