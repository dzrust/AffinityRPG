import { FieldArray, useFormikContext } from "formik";
import { FC, Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { getLabelForSkill } from "../../helpers/text-helpers";
import { HeroJobFormModel } from "@affinity-rpg/models/hero";
import { SKILL, SKILLS } from "@affinity-rpg/models/skills";
import FormSelect from "../form/form-select";

const SkillEditor: FC = () => {
  const { values } = useFormikContext<HeroJobFormModel>();
  return (
    <FieldArray name="skills">
      {({ push, remove }) => (
        <Fragment>
          <FormSelect
            label="Add skill proficiency"
            name="skills"
            inputProps={{ onChange: (e) => (e.target.value !== "Select" ? push(e.target.value) : undefined) }}
            options={["Select", ...SKILLS].filter((skill) => !values.skills.includes(skill))}
            renderOption={(option) => (
              <option key={option} value={option}>
                {option !== "Select" ? getLabelForSkill(option) : option}
              </option>
            )}
          />
          {(values.skills ?? []).map((skill) => {
            return (
              <Row key={skill} className="mt-3">
                <Col>{getLabelForSkill(skill as SKILL)}</Col>
                <Col>
                  <Button variant="danger" onClick={() => remove(values.skills.indexOf(skill))}>
                    Remove
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Fragment>
      )}
    </FieldArray>
  );
};

export default SkillEditor;
