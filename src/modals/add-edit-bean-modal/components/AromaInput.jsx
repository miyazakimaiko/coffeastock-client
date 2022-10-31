import React, { useEffect, useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT } from '../../../utils/Constants';

const AromaInput = ({ rangeList, selectedAroma, setSelectedAroma, isCreatable }) => {


  const options = Object.values(rangeList.aroma_range);

  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setAromaList = (aromaList) => {
    setSelectedAroma(aromaList);

    if (aromaList.length > MAX_COUNT.BEANS.AROMA) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* Cannot select more than {MAX_COUNT.BEANS.AROMA} items.</span>,
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
      title="Aroma"
      options={options}
      value={selectedAroma}
      invalid={warning.invalid}
      onChange={setAromaList}
      warningText={warning.message}
      isCreatable={isCreatable}
    />
  );
};

export default AromaInput