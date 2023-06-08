import React from "react";
import { Form } from "react-bootstrap";
const LoginFormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    //   <div className='form-row'>
    //     <label htmlFor={name} className='form-label'>
    //       {labelText || name}
    //     </label>
    //     <input
    //       id={name}
    //       type={type}
    //       name={name}
    //       value={value}
    //       onChange={handleChange}
    //       className='form-input'
    //     />
    //   </div>
    <Form.Group controlId='password'>
      <Form.Label htmlFor={name}>{labelText || name}</Form.Label>
      <Form.Control
        id={name}
        type={type}
        placeholder={name}
        value={value}
        onChange={handleChange}
      ></Form.Control>
    </Form.Group>
  );
};
export default LoginFormRow;
