import { FC } from "react";
import { faDiceD6 } from "@fortawesome/pro-regular-svg-icons";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { removeRollNotification } from "../../slices/appSlice";
import Emblem from "../emblem";
import { RollNotification, ROLL_TYPES } from "../../models/roll";
import { RATING } from "../../models/rating";
import { STATUS_RATING } from "../../models/status-effect";
import { getRatingText, getStatusRatingText } from "../../helpers/text-helpers";

const getResultByRollType = (rollNotification: RollNotification) => {
  if (rollNotification.type === ROLL_TYPES.RATING_ROLL) {
    return getRatingText(rollNotification.result as RATING);
  }
  if (rollNotification.type === ROLL_TYPES.ROLL) {
    return rollNotification.result as number;
  }
  if (rollNotification.type === ROLL_TYPES.RESISTANCE_ROLL) {
    return rollNotification.result as number;
  }
  if (rollNotification.type === ROLL_TYPES.STATUS_EFFECT) {
    return getStatusRatingText(rollNotification.result as STATUS_RATING);
  }
  if (rollNotification.type === ROLL_TYPES.SKILL_ROLL) {
    return rollNotification.result === true ? "Success" : "Failure";
  }
  if (rollNotification.type === ROLL_TYPES.HIT_ROLL) {
    return rollNotification.result === true ? `Hit +${rollNotification.criticalRolls} Crtiticals` : "Miss";
  }

  return 0;
};

const RollNotificationDisplay: FC = () => {
  const notifications = useAppSelector((state) => state.app).rollNotification;
  const dispatch = useDispatch();
  return (
    <ToastContainer position="bottom-end" className="mt-5" style={{ zIndex: 999999 }}>
      {notifications.map((notification, index) => {
        return (
          <Toast key={notification.id} onClose={() => dispatch(removeRollNotification(index))} autohide delay={6000}>
            <Toast.Header>
              <Emblem innerIcon={faDiceD6} />
              <strong className="me-auto">{notification.message}</strong>
            </Toast.Header>
            <Toast.Body>
              <h4>{getResultByRollType(notification)}</h4>
            </Toast.Body>
          </Toast>
        );
      })}
    </ToastContainer>
  );
};

export default RollNotificationDisplay;
