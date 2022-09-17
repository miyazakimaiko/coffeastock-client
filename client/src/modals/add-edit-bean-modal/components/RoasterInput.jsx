import React, { useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT } from '../../../utils/Constants';

const RoasterInput = ({ rangeList, selectedRoaster, setSelectedRoaster, isCreatable }) => {


  const options = Object.values(rangeList.roaster_range);

  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setRoasterList = (roasterList) => {
    setSelectedRoaster(roasterList);

    if (roasterList.length > MAX_COUNT.BEANS.ROASTER) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* Cannot select more than {MAX_COUNT.BEANS.ROASTER} roasters.</span>,
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
      title="Roaster"
      options={options}
      value={selectedRoaster}
      invalid={warning.invalid}
      onChange={setRoasterList}
      warningText={warning.message}
      isCreatable={isCreatable}
    />
  );
};

export default RoasterInput