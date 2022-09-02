import { FC } from "react";
import { RATINGS, RATING } from "@affinity-rpg/models";
import { FormSelect } from "./form-select";

export const RatingSelect: FC = () => {
  return (
    <FormSelect
      label="Rating"
      name="rating"
      options={RATINGS}
      renderOption={(option: RATING) => (
        <option key={option} value={option}>
          {option}
        </option>
      )}
    />
  );
};
