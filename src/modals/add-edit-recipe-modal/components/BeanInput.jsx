import React, { useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const BeanInput = ({ mode, beanList, selectedBean, setSelectedBean }) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "* Required",
  });

  const setBeanList = (selectedItemsList) => {
    setSelectedBean(selectedItemsList);

    if (!Boolean(selectedItemsList) || selectedItemsList.length === 0) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* Required</span>,
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
    title="Coffee Bean"
    options={Object.values(beanList)}
    isDisabled={mode === "edit"}
    value={selectedBean}
    onChange={setBeanList}
    isCreatable={false}
    isMulti={false}
    invalid={warning.invalid}
    warningText={warning.message}
  />
  );
};

export default BeanInput