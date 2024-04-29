import React from "react";
import formStyle from "./TextArea.module.css";

const TextArea = ({ label, placeholder, note, onChange }) => {
  return (
    <div className={formStyle.box}>
      <label htmlFor="description">{label}</label>
      <textarea
        name=""
        id="description"
        cols="30"
        rows="6"
        placeholder={placeholder}
        className={formStyle.textarea}
        onChange={onChange}
      ></textarea>
      {note ? <p>{note}</p> : ""}
    </div>
  );
};

export default TextArea;
