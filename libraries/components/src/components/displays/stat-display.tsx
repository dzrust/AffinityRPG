import { FC } from "react";
import { Badge, Button } from "react-bootstrap";

type Props = {
  label: string;
  variant: string;
  display: boolean;
  isRollingAllowed?: boolean;
  rollDice?: () => void;
};

export const StatDisplay: FC<Props> = ({ label, variant, display, isRollingAllowed = false, rollDice }) => {
  if (!display) {
    return null;
  }
  if (isRollingAllowed) {
    return (
      <Button className="me-1 text-white" variant="link" onClick={rollDice}>
        {label}
      </Button>
    );
  }
  return (
    <Badge className="me-1" bg={variant}>
      {label}
    </Badge>
  );
};
