import React, { useState } from 'react'
import { useUserData } from '../../../context/AccountContext';
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT, USER_TYPE_KEY } from '../../../utils/Constants';

const OriginInput = ({ rangeList, selectedOrigin, setSelectedOrigin }) => {

  const user = useUserData();
  
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
      isCreatable={options.length < MAX_COUNT.RANGES[user[USER_TYPE_KEY]]}
      warningText={warning.message}
    />
  );
};

export default OriginInput