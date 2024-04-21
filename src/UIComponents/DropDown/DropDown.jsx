import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Style from "./DropDown.module.css";

export default function DropDown({ keys, selectedVal, setSelectedVal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(keys[0]);
  return (
    <Dropdown onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <Button variant="bordered" className={Style.trigger_btn}>
          <span>{selectedVal ? selectedVal : value}</span>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        selectionMode="single"
        selectedKeys={selectedVal}
        onSelectionChange={(val) => {
          setSelectedVal(val.currentKey);
          setValue(val.currentKey);
        }}
      >
        {keys.map((key) => (
          <DropdownItem key={key}>{key}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
