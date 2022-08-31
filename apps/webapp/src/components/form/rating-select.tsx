import { FC } from "react";
import { RATINGS, RATING } from "../../models/rating";
import FormSelect from "./form-select";

const RatingSelect: FC = () => {
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

export default RatingSelect;
