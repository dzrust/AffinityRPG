import { FC } from "react";
import { STATUS_EFFECT, STATUS_EFFECTS } from "@affinity-rpg/models/status-effect";
import FormSelect from "./form-select";

const StatusEffectSelect: FC = () => {
  return (
    <FormSelect
      label="Status Effect"
      name="statusEffect"
      options={STATUS_EFFECTS}
      renderOption={(option: STATUS_EFFECT) => (
        <option key={option} value={option}>
          {option}
        </option>
      )}
    />
  );
};

export default StatusEffectSelect;