import React from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const CustomDropdown = ({
  array,
  selectedKeys,
  setSelectedKeys,
  selectionMode,
  label
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">{selectedKeys.currentKey ? selectedKeys.currentKey : label}</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        selectionMode={selectionMode}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {array.map((el, i) => (
          <DropdownItem
            key={el.key ? el.key : el.data}
            className={el.class}
            color={el.color}
          >
            {el.data}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomDropdown;
