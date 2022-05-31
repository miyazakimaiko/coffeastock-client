import React from 'react'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { unescapeHtml } from '../helpers/HtmlConverter';

const FormMultiSelect = ({
  title,
  options,
  value,
  invalid = false,
  onChange,
  isCreatable = false,
  isDisabled = false,
  isMulti = true,
  warningText,
  counterText,
}) => {

  const decodedOptions = options.map((option) => {
    return {
      ...option,
      label: unescapeHtml(option.label),
    };
  });

  const customStyle = {
    control: base => ({
      ...base,
      border: invalid ? 0 : "1px solid lightgrey",
      // This line disable the blue border
      boxShadow: invalid ? "0 0 0 2pt #EB5E28" : "none"
    })
  };

  return (
    <div className="form-section">
      <div className="mb-1">
        <label className="font-medium">{title}</label>
        <span className="text-xs ml-2">{warningText}</span>
      </div>
      {isCreatable ? (
        <CreatableSelect
          isMulti={isMulti}
          isDisabled={isDisabled}
          styles={customStyle}
          options={decodedOptions}
          defaultValue={value}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Select
          isMulti={isMulti}
          isDisabled={isDisabled}
          styles={customStyle}
          options={decodedOptions}
          defaultValue={value}
          value={value}
          onChange={onChange}
        />
      )}
      <span className="text-xs float-right mt-1">{counterText}</span>
    </div>
  );
};

export default FormMultiSelect