import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { DropDownMenuProps } from "./DropDownMenu.types";

const DropDownMenu = (props: DropDownMenuProps) => {
  const { items } = props;
  return (
    <Dropdown className="relative z-20">
      <DropdownTrigger>
        <Button className="p-2 min-w-0 rounded-full h-max">
          <div className="flex gap-1 w-6 h-6 justify-center items-center rounded-full">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="post actions" items={items}>
        {items.map((item) => (
          <DropdownItem
            key={item.key}
            color={item.color}
            className={item.className}
            onClick={item.onClick}
            onTouchEnd={item.onClick}
          >
            {item.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownMenu;
