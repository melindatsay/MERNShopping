import React from "react";
const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <fieldset>
      {/* <label htmlFor={name} className=''>
          {labelText || name}
        </label> */}
      {/* <p className='my-0'>{labelText || name}</p> */}
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className='select-container'
      >
        <option disabled>{labelText}</option>
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </fieldset>
  );
};
export default FormRowSelect;
