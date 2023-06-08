import React from "react";
const FormRadio = ({ id, name, value, handleChange, label }) => {
  return (
    <>
      {/* <label for={id}>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className='select-container'
        /> */}
      {/* <label htmlFor={id}>{label}</label> */}
      {/* {id}
      </label> */}

      <fieldset className='radio-fieldset'>
        <div className='some-class'>
          <input
            type='radio'
            className='radio'
            name={name}
            value={value}
            id={id}
            onChange={handleChange}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      </fieldset>
    </>
  );
};
export default FormRadio;
