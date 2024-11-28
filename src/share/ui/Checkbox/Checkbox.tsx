import { Checkbox as CheckboxUI } from "@nextui-org/checkbox";
import { ICheckbox } from "./Checkbox.types";

const Checkbox = (props: ICheckbox) => {
  const { label, value } = props;
  return (
    <>
      <CheckboxUI
        className="bg-[#2A2A2A] rounded-full py-2 px-4"
        value={value}
        defaultSelected
        radius="full"
      >
        {label}
      </CheckboxUI>
    </>
  );
};

export default Checkbox;
