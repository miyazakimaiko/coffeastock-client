import React, { useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';
import { MAX_COUNT } from '../../../utils/Constants';

const ProcessInput = ({ rangeList, selectedProcess, setSelectedProcess, isCreatable }) => {

  const options = Object.values(rangeList.process_range);

  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setProcessList = (processList) => {
    setSelectedProcess(processList);

    if (processList.length > MAX_COUNT.BEANS.PROCESS) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* Cannot select more than {MAX_COUNT.BEANS.PROCESS} items.</span>,
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
      title="Process"
      options={options}
      value={selectedProcess}
      invalid={warning.invalid}
      onChange={setProcessList}
      warningText={warning.message}
      isCreatable={isCreatable}
    />
  );
};

export default ProcessInput