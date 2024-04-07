import React from "react";
import Style from "./InputField.module.css";

const InputField = ({ label, placeholder, value, onChange, icon }) => {
  return (
    <div className={Style.Form_box_input}>
      <label>{label}</label>
      {icon ? (
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>{icon}</div>

          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          className={Style.Form_box_input_userName}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputField;
