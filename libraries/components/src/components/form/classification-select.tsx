import { FC } from "react";
import { FormSelect } from "./form-select";

type Props = {
  label: string;
  classifications: string[];
  getClassificationText: (option: any) => string;
};

export const ClassificationSelect: FC<Props> = ({ label, classifications, getClassificationText }) => {
  return (
    <FormSelect
      label={label}
      name="classification"
      options={classifications}
      renderOption={(option) => (
        <option key={option} value={option}>
          {getClassificationText(option)}
        </option>
      )}
    />
  );
};
