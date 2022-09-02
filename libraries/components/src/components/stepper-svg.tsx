import { faCheck, faHorizontalRule } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useMemo } from "react";
import { Emblem } from "./emblem";

type StepperSVGProps = {
  numberOfSteps: number;
  activeStep: number;
  completeSteps: number[];
  onStepClick: (step: number) => void;
};

export const StepperSVG: FC<StepperSVGProps> = ({ numberOfSteps, activeStep, completeSteps, onStepClick }) => {
  const stepsArray = useMemo(() => {
    const stepsArray: number[] = [];
    for (let i = 0; i < numberOfSteps; i++) {
      stepsArray.push(i + 1);
    }
    return stepsArray;
  }, [numberOfSteps]);
  return (
    <div className="stepper__container">
      {stepsArray.map((step) => (
        <div className="stepper__emblem--container" key={`STEP_${step}`}>
          {step !== 1 ? (
            <FontAwesomeIcon
              icon={faHorizontalRule}
              className={`stepper__emblem--spacer ${
                completeSteps.includes(step) ? "stepper__emblem--spacer-complete" : ""
              }`}
            />
          ) : null}
          <Emblem
            innerIcon={completeSteps.includes(step) ? faCheck : undefined}
            primaryColor={step === activeStep ? undefined : "#495057"}
            seconadryColor={step === activeStep ? undefined : "#ffffff"}
            onClick={() => onStepClick(step)}
          />
        </div>
      ))}
    </div>
  );
};
