import { FC } from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
  title: string;
  text?: string;
  isOpen: boolean;
  onYes: () => void;
  onNo: () => void;
};

export const ConfirmationModal: FC<Props> = ({ title, text, isOpen, onYes, onNo }) => {
  return (
    <Modal show={isOpen}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onNo}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onYes}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
