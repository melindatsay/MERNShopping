import React from "react";
const FormRow = ({
  type,
  name,
  value,
  placeholder,
  handleChange,
  labelText,
}) => {
  return (
    <fieldset>
      <p>
        <label htmlFor={name}>{labelText}</label>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className='select-container'
        />
      </p>
    </fieldset>
  );
};
export default FormRow;
