import React, { useState } from 'react'
import { useUserData } from '../../../context/AccountContext';
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT, USER_TYPE_KEY } from '../../../utils/Constants';

const MethodInput = ({ rangeList, selectedMethod, setSelectedMethod }) => {

  const user = useUserData();

  const options = Object.values(rangeList.method_range);

  const [warning, setWarning] = useState({
    invalid: false,
    message: "* Required",
  });

  const setMethod = (selectedItem) => {
    setSelectedMethod(() => [selectedItem]);

    if (!Boolean(selectedItem) || selectedItem.length === 0) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">At least one bean must be selected.</span>,
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
      title="Brewing Method"
      options={options}
      value={selectedMethod}
      onChange={setMethod}
      isCreatable={options.length < MAX_COUNT.RANGES[user[USER_TYPE_KEY]]}
      isMulti={false}
      invalid={warning.invalid}
      warningText={warning.message}
    />
  );
};

export default MethodInput