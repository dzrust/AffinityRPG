import { Formik } from "formik";
import { FC, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateHeroMutation } from "../../../api/heroes";
import FormControl from "../../../components/form/form-control";
import { HeroContext } from "../../../components/hero/hero-hoc";
import SkillEditor from "../../../components/skill/skill-editor";
import { getLevelFromExperience } from "../../../helpers/level";
import { useIsLoading } from "../../../hooks";
import { heroJobFormModel, HeroJobFormModel, STAGES } from "@affinity-rpg/models/hero";
import { ROUTES } from "@affinity-rpg/models/routes";
import { SKILLS, SkillState } from "@affinity-rpg/models/skills";
import { STATUS_EFFECT } from "@affinity-rpg/models/status-effect";

const JobStage: FC = () => {
  const { hero } = useContext(HeroContext);
  const isLoading = useIsLoading();
  const navigator = useNavigate();
  const { id } = useParams();
  const [updateHero] = useUpdateHeroMutation();
  const onSubmit = async (form: HeroJobFormModel) => {
    if (!id) throw "failure";
    if (isLoading) return;
    const experience = parseInt(`${form.experience ?? 0}`, 10);
    const skills = SKILLS.map(
      (skill) =>
        ({
          skill,
          modifier: form.skills.includes(skill) ? 1 : 0,
          rollStatus: form.skills.includes(skill) ? STATUS_EFFECT.ADVANTAGE : STATUS_EFFECT.NONE,
        } as SkillState),
    );
    updateHero({
      ...hero,
      heroClass: form.heroClass,
      job: getLevelFromExperience(experience) >= 5 ? form.job : "",
      level: getLevelFromExperience(experience),
      experience,
      skills,
    })
      .unwrap()
      .then(() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.MASTERY}`));
  };
  return (
    <Formik
      initialValues={
        {
          heroClass: hero.heroClass,
          job: hero.job,
          level: parseInt(`${hero.level}`, 10),
          experience: parseInt(`${hero.experience}`, 10),
          skills: (hero.skills ?? [])
            .filter((skill) => `${skill.rollStatus}`.toUpperCase() === STATUS_EFFECT.ADVANTAGE)
            .map((skill) => `${skill.skill}`.toUpperCase()),
        } as HeroJobFormModel
      }
      validationSchema={heroJobFormModel}
      onSubmit={onSubmit}
    >
      {({ values, touched, handleSubmit, isSubmitting }) => (
        <Form noValidate>
          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Class" name="heroClass" />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12}>
              <FormControl
                label="Job"
                name="job"
                inputProps={{
                  disabled: getLevelFromExperience(values.experience ?? 0) < 5,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12}>
              <FormControl
                label="Level"
                name="level"
                inputProps={{
                  disabled: true,
                  type: "number",
                  value: `${touched.experience ? getLevelFromExperience(values.experience ?? 0) : values.level}`,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Experience" name="experience" inputProps={{ type: "number" }} />
            </Col>
          </Row>

          <SkillEditor />

          <div className="hero-builder__form-buttons-container">
            <Button variant="danger" onClick={() => navigator(`${ROUTES.HERO}/${id}`)} disabled={isSubmitting}>
              Exit Builder
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.INTRO}`)}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button onClick={() => handleSubmit()} disabled={isSubmitting}>
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JobStage;
