import { FC, Fragment, useContext, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HeroContext } from "../../components/hero/hero-hoc";
import StepperSVG from "../../components/stepper-svg";
import { getLevelFromExperience } from "@affinity-rpg/data/helpers/level";
import { AFFINITIES } from "@affinity-rpg/models/affinity";
import { GENDERS, Hero, STAGES } from "@affinity-rpg/models/hero";
import { ROUTES } from "@affinity-rpg/models/routes";
import ConfirmationStage from "./stages/confirmation";
import HistoryStage from "./stages/history";
import IntroStage from "./stages/intro";
import InventoryStage from "./stages/inventory";
import JobStage from "./stages/job";
import MasteriesStage from "./stages/mastery";

const stages = [
  {
    name: STAGES.INTRO,
    title: "Who are you?",
    isComplete: (hero: Hero) =>
      hero.name.length > 0 &&
      GENDERS.includes(hero.gender) &&
      AFFINITIES.includes(hero.affinity) &&
      hero.race.length > 0,
  },
  {
    name: STAGES.JOB,
    title: "What do you do?",
    isComplete: (hero: Hero) =>
      ((hero.level >= 5 && (hero.job ?? "").length > 0) || hero.level < 5) &&
      hero.heroClass.length > 0 &&
      getLevelFromExperience(hero.experience) === hero.level,
  },
  {
    name: STAGES.MASTERY,
    title: "What are your masteries?",
    isComplete: (hero: Hero) =>
      hero.totalHealth > 0 &&
      hero.currentHealth <= hero.totalHealth &&
      hero.potency > 0 &&
      hero.vigor > 0 &&
      hero.finesse > 0,
  },
  {
    name: STAGES.INVENTORY,
    title: "What do you carry?",
    isComplete: (hero: Hero) => hero.money >= 0,
  },
  {
    name: STAGES.HISTORY,
    title: "What is your history?",
    isComplete: (hero: Hero) =>
      hero.backstory.length > 0 ||
      hero.maxims.length > 0 ||
      hero.quirks.length > 0 ||
      hero.habits.length > 0 ||
      hero.strengths.length > 0 ||
      hero.weaknesses.length > 0,
  },
  {
    name: STAGES.CONFIRMATION,
    title: "Does this look right?",
    isComplete: (_: Hero) => false,
  },
];

const HeroBuilder: FC = () => {
  const { hero } = useContext(HeroContext);
  const { stage: activeStage } = useParams();
  const navigator = useNavigate();
  let route = useLocation().pathname;
  const activeStep = useMemo(() => {
    const activeIndex = stages.findIndex((stage) => stage.name === activeStage) + 1;
    return {
      activeIndex,
      stage: stages[activeIndex - 1],
    };
  }, [activeStage, route]);
  const completeStages = useMemo(() => {
    return stages.filter((stage) => stage.isComplete(hero)).map((_, index) => index + 1);
  }, [activeStage, route]);
  return (
    <Fragment>
      <Row>
        <Col>
          <h1>{activeStep.stage.title}</h1>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className="hero-builder__stepper">
          <StepperSVG
            numberOfSteps={stages.length}
            activeStep={activeStep.activeIndex}
            completeSteps={completeStages}
            onStepClick={(step: number) => navigator(`${ROUTES.HERO_BUILDER}/${hero.id}/${stages[step - 1].name}`)}
          />
        </Col>
      </Row>
      <Row className="hero-builder__form">
        <Col>
          {activeStep.stage.name === STAGES.INTRO ? <IntroStage /> : null}
          {activeStep.stage.name === STAGES.JOB ? <JobStage /> : null}
          {activeStep.stage.name === STAGES.MASTERY ? <MasteriesStage /> : null}
          {activeStep.stage.name === STAGES.INVENTORY ? <InventoryStage /> : null}
          {activeStep.stage.name === STAGES.HISTORY ? <HistoryStage /> : null}
          {activeStep.stage.name === STAGES.CONFIRMATION ? <ConfirmationStage /> : null}
        </Col>
      </Row>
    </Fragment>
  );
};

export default HeroBuilder;
