import React, { useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT } from '../../../utils/Constants';

const FarmInput = ({ rangeList, selectedFarm, setSelectedFarm, isCreatable }) => {


  const options = Object.values(rangeList.farm_range);

  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setFarmList = (farmList) => {
    setSelectedFarm(farmList);

    if (farmList.length > MAX_COUNT.BEANS.FARM) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* Cannot select more than {MAX_COUNT.BEANS.FARM} farms.</span>,
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
      title="Farm"
      options={options}
      value={selectedFarm}
      invalid={warning.invalid}
      onChange={setFarmList}
      warningText={warning.message}
      isCreatable={isCreatable}
    />
  );
};

export default FarmInput