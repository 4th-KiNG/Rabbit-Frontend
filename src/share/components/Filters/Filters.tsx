import { useState } from "react";
import { CheckboxGroup } from "@nextui-org/react";
import { useTheme } from "next-themes";

import { sort, sortBlack } from "../../../assets";

import { checkboxes } from "./Filters.static";
import { ICheckbox } from "../../ui/Checkbox/Checkbox.types";
import { Button, Checkbox } from "../..";

const Filters = () => {
  const [isActive, setIsActive] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <CheckboxGroup
        className="relative"
        defaultValue={["politics", "games", "science"]}
      >
        <div className="max-w-[620px] flex flex-row flex-wrap gap-y-4">
          <Button
            className="rounded-full py-2 px-4 mr-2 bg-[#eeeeee] dark:bg-[#2A2A2A]"
            onClick={() => setIsActive(!isActive)}
          >
            <span>Сортировать</span>
            <img
              className={`${
                !isActive ? "-scale-100" : ""
              } transition-transform duration-150 ease-linear`}
              src={theme == "light" ? sortBlack : sort}
              alt="arrow"
            />
          </Button>
          {isActive &&
            checkboxes.map((checkbox: ICheckbox, index) => {
              return (
                <span className="py-2 px-4" key={index}>
                  <Checkbox {...checkbox} />
                </span>
              );
            })}
        </div>
      </CheckboxGroup>
    </>
  );
};

export default Filters;
