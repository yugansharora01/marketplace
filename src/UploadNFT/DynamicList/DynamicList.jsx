import React from "react";
import Style from "../Upload.module.css";
import formStyle from "../../AccountPage/Form/Form.module.css";

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const DynamicList = ({ heading, array, setArray }) => {
  const addField = () => {
    let newField = { key: "", value: "" };
    setArray([...array, newField]);
  };

  const removeField = () => {
    setArray((previousArr) => previousArr.slice(0, -1));
  };

  const handleFormChange = (index, event) => {
    let data = [...array];
    data[index][event.target.name] = event.target.value;
    setArray(data);
  };

  return (
    <div className={formStyle.Form_box_input}>
      <div className={Style.upload_addTrait}>
        <label htmlFor={heading}>{heading}</label>
        <span className={Style.upload_addTraitBtn} onClick={addField}>
          <AiOutlinePlusCircle />
        </span>
        <span className={Style.upload_addTraitBtn} onClick={removeField}>
          <AiOutlineMinusCircle />
        </span>
      </div>

      <div>
        {array.map((el, i) => (
          <div key={i}>
            <input
              type="text"
              placeholder="key"
              name="key"
              className={formStyle.Form_box_input_trait}
              value={el.key}
              onChange={(event) => handleFormChange(i, event)}
            />
            <input
              type="text"
              placeholder="value"
              name="value"
              className={formStyle.Form_box_input_trait}
              value={el.value}
              onChange={(event) => handleFormChange(i, event)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicList;
