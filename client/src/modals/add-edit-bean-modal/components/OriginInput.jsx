import React, { useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const OriginInput = ({ rangeList, selectedOrigin, setSelectedOrigin, isCreatable }) => {


  const options = Object.values(rangeList.origin_range);

  const [warning, setWarning] = useState({
    invalid: false,
    message: "* Required",
  });

  const setOriginList = (originList) => {
    setSelectedOrigin(originList);

    if (originList.length === 0) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">At least one origin must be selected.</span>,
      });

    } else {
      setWarning({
        ...warning,
        invalid: false,
        message: "",
      });
    }
  };

  return (
    <FormMultiSelect
      title="Origin"
      options={options}
      value={selectedOrigin}
      invalid={warning.invalid}
      onChange={setOriginList}
      warningText={warning.message}
      isCreatable={isCreatable}
    />
  );
};

export default OriginInput