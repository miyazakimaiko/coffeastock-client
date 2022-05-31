import React, { useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const MethodInput = ({ rangeList, selectedMethod, setSelectedMethod }) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "* Required",
  });

  const setMethod = (selectedItem) => {
    setSelectedMethod(selectedItem);

    if (selectedItem.length === 0) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">At least one bean must be selected.</span>,
      });

    } else {
      setWarning({
        ...warning,
        invalid: false,
        message: "* Required",
      });
    }
  };

  return (
    <FormMultiSelect
      title="Brewing Method"
      options={Object.values(rangeList.method_range)}
      value={selectedMethod}
      onChange={setMethod}
      isCreatable={true}
      isMulti={false}
      warningText={warning.message}
    />
  );
};

export default MethodInput