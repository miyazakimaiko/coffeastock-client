import React, { useState } from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';

const BlendBeanInput = ({ targetBean, beanList, selectedBlendBeans, setSelectedBlendBeans }) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "* Required",
  });

  const setBlendBeanList = (selectedItems) => {
    setSelectedBlendBeans(selectedItems);

    if (selectedItems.length === 0) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* At least one bean must be selected.</span>,
      });
    } 
    else if (selectedItems.length > 5) {
      setWarning({
        ...warning,
        invalid: true,
        message: <span className="text-red">* Cannot select more than five beans.</span>,
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
      title="Blend of"
      options={Object.values(beanList).map(
        ({ bean_id: value, ...rest }) => ({
          value,
          isDisabled: targetBean.bean_id === value,
          ...rest,
        })
      )}
      value={selectedBlendBeans}
      invalid={warning.invalid}
      onChange={setBlendBeanList}
      isCreatable={false}
      warningText={warning.message}
    />
  );
};

export default BlendBeanInput