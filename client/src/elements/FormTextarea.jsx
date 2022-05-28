import React from 'react'

const FormTextarea = ({
  title,
  name,
  autoComplete = "off",
  value,
  invalid = false,
  onChange,
  warningText,
  counterText
}) => {
  return (
    <div className="form-section">
      <label className="font-medium">{title}</label>
      <span className="text-xs ml-2">{warningText}</span>
      <textarea
        name={name}
        autoComplete={autoComplete}
        placeholder="e.g. Name of the shop you bought this coffee, the price and weight etc."
        className={`${invalid ? 'red-outline' : 'blue-outline-transition'}
          block w-full h-40 py-2 px-3 rounded border-1`}
        value={value}
        onChange={onChange}
      />
      <span className="text-xs float-right mt-1">{counterText}</span>
    </div>
  );
};

export default FormTextarea