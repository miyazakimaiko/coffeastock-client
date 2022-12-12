import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { unescapeHtml } from '../helpers/HtmlConverter';
import { MAX_LENGTH } from '../utils/Constants';

const FormMultiSelect = ({
  title = null,
  options,
  value,
  invalid = false,
  onChange,
  isCreatable = false,
  isClearable = true,
  isDisabled = false,
  isMulti = true,
  warningText,
  counterText,
  maxLabelLength = MAX_LENGTH.RANGES_LABEL,
}) => {
  
  const [decodedOptions, setDecodedOptions] = useState([]);
  
  useEffect(() => {
    const decoded = options.map((option) => {
      return {
        ...option,
        label: unescapeHtml(option.label),
      };
    });
    setDecodedOptions(decoded);
  }, [options])
  
  const [valid, setValid] = useState(!invalid);

  useEffect(() => {
    setValid(!invalid);
  }, [invalid])

  const [warning, setWarning] = useState(warningText);

  useEffect(() => {
    setWarning(warningText);
  }, [warningText]);
  
  function validateCharLength(val) {
    if (val.length > maxLabelLength) {
      setValid(false);
      setWarning(`The name must be ${maxLabelLength} letters or shorter.`)
    }
    else if (val) {
      setValid(true);
      setWarning(warningText)
    }
  }

  useEffect(() => {
    if (Array.isArray(value)) {
      validateItemListLabelLength(value);
    }
  }, [value])

  function validateItemListLabelLength(itemList) {
    let labelTooLong = false;
    for (const item of itemList) {
      if (item?.label.length > maxLabelLength) {
        labelTooLong = true;
      }
    }
    if (labelTooLong) {
      setValid(false);
      setWarning(`Selected item\'s name exceeded the max number of letters. 
        It must be ${maxLabelLength} letters or shorter.`)
    }
    else {
      setValid(!invalid);
      setWarning(warningText);
    }
  }

  const customStyle = {
    control: base => ({
      ...base,
      border: valid ? "1px solid lightgrey" : 0,
      // This line disable the blue border
      boxShadow: valid ? "none" : "0 0 0 2pt #EB5E28"
    })
  };

  return (
    <div className="form-section">
      {title || warning ? (
        <div className="mb-1">
          <label className="font-medium">{title}</label>
          <span className="text-xs ml-2 text-red">{warning}</span>
        </div>
        ) : null
      }
      {isCreatable ? (
        <CreatableSelect
          isMulti={isMulti}
          isClearable={isClearable}
          isDisabled={isDisabled}
          styles={customStyle}
          options={decodedOptions}
          defaultValue={value}
          value={value}
          onChange={onChange}
          onInputChange={validateCharLength}
        />
      ) : (
        <Select
          isMulti={isMulti}
          isClearable={isClearable}
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