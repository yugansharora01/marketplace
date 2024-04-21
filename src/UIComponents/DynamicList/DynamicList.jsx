import React, { useEffect } from "react";
//import Style from "../Upload.module.css";
import formStyle from "../../AccountPage/Form/Form.module.css";
import Style from "../DynamicList/DynamicList.module.css";

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import DropDown from "../DropDown/DropDown";

const DynamicList = ({ heading, array, setArray, keys }) => {
  const addField = () => {
    let newField = { key: keys ? keys[0] : "", value: "" };
    setArray([...array, newField]);
  };

  const removeField = () => {
    setArray((previousArr) => previousArr.slice(0, -1));
  };

  const handleFormChange = (index, key, value) => {
    let data = [...array];
    data[index][key] = value;
    setArray(data);
  };

  return (
    <div className={Style.box}>
      <div className={Style.addTrait}>
        <label>{heading}</label>
        <span className={Style.addTrait_Btn} onClick={addField}>
          <AiOutlinePlusCircle />
        </span>
        <span className={Style.addTrait_Btn} onClick={removeField}>
          <AiOutlineMinusCircle />
        </span>
      </div>

      <div>
        {array.map((el, i) => (
          <div key={i} className={Style.input_container}>
            {keys ? (
              <DropDown
                keys={keys}
                setSelectedVal={(val) => handleFormChange(i, "key", val)}
              />
            ) : (
              <input
                type="text"
                placeholder="key"
                name="key"
                className={Style.input}
                value={el.key}
                onChange={(e) =>
                  handleFormChange(i, e.target.name, e.target.value)
                }
              />
            )}
            <input
              type="text"
              placeholder="value"
              name="value"
              className={Style.input}
              value={el.value}
              onChange={(e) =>
                handleFormChange(i, e.target.name, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicList;
