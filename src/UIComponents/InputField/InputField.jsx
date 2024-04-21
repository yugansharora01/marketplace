import React from "react";
import Style from "./InputField.module.css";

import { Input } from "@nextui-org/react";

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  startIcon,
  endIcon,
  isInValid,
  invalidText,
  isRequired,
}) => {
  return (
    <div className={Style.Form_box_input}>
      <div className={Style.Form_box_input_label}>
        {label}
        {isRequired ? <p className="text-red-600">&nbsp;*</p> : ""}
      </div>
      {startIcon ? (
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>{icon}</div>
          <Input
            variant="flat"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            isInvalid={isInValid}
            errorMessage={
              isInValid
                ? !invalidText
                  ? "This field is Required"
                  : invalidText
                : ""
            }
            startContent={startIcon}
            endContent={endIcon}
            classNames={{
              inputWrapper: "bg-transparent cursor-pointer",
            }}
          />
        </div>
      ) : (
        <Input
          variant="flat"
          value={value}
          onChange={onChange}
          isInvalid={isInValid}
          errorMessage={
            isInValid
              ? !invalidText
                ? "This field is Required"
                : invalidText
              : ""
          }
          startContent={startIcon}
          endContent={endIcon}
          classNames={{
            inputWrapper:
              "bg-transparent hover:!bg-transparent focus-within:!bg-transparent border-solid border-primary border-1",
          }}
        />
      )}
    </div>
  );
};

export default InputField;
