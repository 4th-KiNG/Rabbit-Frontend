import { useState } from "react";
import { CheckboxGroup } from "@nextui-org/react";

import { sort } from "../../../assets";

import { checkboxes } from "./Filters.static";
import { ICheckbox } from "../../ui/Checkbox/Checkbox.types";
import { Button, Checkbox } from "../..";

const Filters = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <CheckboxGroup
        className="relative"
        defaultValue={["politics", "games", "science"]}
      >
        <div className="max-w-[620px] flex flex-row flex-wrap gap-y-4">
          <Button
            className="bg-[#2A2A2A] rounded-full py-2 px-4 mr-2"
            onClick={() => setIsActive(!isActive)}
          >
            <span>Сортировать</span>
            <img
              className={`${
                !isActive ? "-scale-100" : ""
              } transition-transform duration-150 ease-linear`}
              src={sort}
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
