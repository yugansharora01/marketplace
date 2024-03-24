import React from "react";
import formStyle from "./InputField.module.css";

const InputField = ({ label, placeholder, value, onChange }) => {
  return (
    <div className={formStyle.Form_box_input}>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={formStyle.Form_box_input_userName}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
