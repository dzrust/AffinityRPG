import { Formik } from "formik";
import { FC, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "../../../components/form/form-control";
import { HeroContext } from "../../../components/hero/hero-hoc";
import MultiStringFormControl from "../../../components/form/multi-string-form-control";
import { useIsLoading } from "../../../hooks";
import { heroHistoryFormModel, HeroHistoryFormModel, STAGES } from "@affinity-rpg/models/hero";
import { ROUTES } from "@affinity-rpg/models/routes";
import { useUpdateHeroMutation } from "../../../../../../libraries/data/api/heroes";

const HistoryStage: FC = () => {
  const { hero } = useContext(HeroContext);
  const isLoading = useIsLoading();
  const navigator = useNavigate();
  const [updateHero] = useUpdateHeroMutation();
  const { id } = useParams();
  const onSubmit = async (form: HeroHistoryFormModel) => {
    if (!id) throw "failure";
    if (isLoading) return;
    updateHero({
      ...hero,
      backstory: form.backstory ?? "",
      maxims: (form.maxims ?? []).filter((value) => value !== undefined) as string[],
      quirks: (form.quirks ?? []).filter((value) => value !== undefined) as string[],
      habits: (form.habits ?? []).filter((value) => value !== undefined) as string[],
      strengths: (form.strengths ?? []).filter((value) => value !== undefined) as string[],
      weaknesses: (form.weaknesses ?? []).filter((value) => value !== undefined) as string[],
    })
      .unwrap()
      .then(() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.CONFIRMATION}`));
  };
  return (
    <Formik
      initialValues={
        {
          backstory: hero.backstory,
          maxims: hero.maxims,
          quirks: hero.quirks,
          habits: hero.habits,
          strengths: hero.strengths,
          weaknesses: hero.weaknesses,
        } as HeroHistoryFormModel
      }
      validationSchema={heroHistoryFormModel}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, isSubmitting }) => (
        <Form noValidate>
          <Row>
            <Col sm={12}>
              <FormControl label="Backstory" name="backstory" inputProps={{ rows: 5, as: "textarea" }} />
            </Col>
          </Row>
          <MultiStringFormControl
            controlLabel="New Maxim"
            name="maxim"
            arrayName="maxims"
            tableHeader="Maxim"
            values={values.maxims as string[]}
          />
          <MultiStringFormControl
            controlLabel="New Quirk"
            name="quirk"
            arrayName="quirks"
            tableHeader="Quirk"
            values={values.quirks as string[]}
          />
          <MultiStringFormControl
            controlLabel="New Habit"
            name="habit"
            arrayName="habits"
            tableHeader="Habit"
            values={values.habits as string[]}
          />
          <MultiStringFormControl
            controlLabel="New Strength"
            name="strength"
            arrayName="strengths"
            tableHeader="Strength"
            values={values.strengths as string[]}
          />
          <MultiStringFormControl
            controlLabel="New Weakness"
            name="weakness"
            arrayName="weaknesses"
            tableHeader="Weakness"
            values={values.weaknesses as string[]}
          />

          <div className="hero-builder__form-buttons-container">
            <Button
              variant="danger"
              onClick={() => navigator(`${ROUTES.HERO}/${id}`)}
              disabled={isSubmitting || isLoading}
            >
              Exit Builder
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.INVENTORY}`)}
              disabled={isSubmitting || isLoading}
            >
              Back
            </Button>
            <Button onClick={() => handleSubmit()} disabled={isSubmitting || isLoading}>
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default HistoryStage;
