import { FC } from "react";
import { ELEMENTS, ELEMENT } from "@affinity-rpg/models";
import { FormSelect } from "./form-select";

export const ElementSelect: FC = () => {
  return (
    <FormSelect
      label="Element"
      name={`element`}
      options={ELEMENTS}
      renderOption={(option: ELEMENT) => (
        <option key={option} value={option}>
          {option}
        </option>
      )}
    />
  );
};
