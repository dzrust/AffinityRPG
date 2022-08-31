import { faFlaskPotion } from "@fortawesome/pro-regular-svg-icons";
import { FC, Fragment } from "react";
import { Badge, Card } from "react-bootstrap";
import { Item } from "../../models/item";
import Emblem from "../emblem";
import WeaponSlots from "../weapon/weapon-slots";

type Props = {
  item: Item;
  onSelectItem?: () => void;
};

const badgeBackground = "primary";
const ItemViewer: FC<Props> = ({ item, onSelectItem }) => {
  return (
    <Card onClick={onSelectItem} className={!!onSelectItem ? "clickable" : ""}>
      <Card.Header className="item__card-header">
        <div className="item__card-header-emblem">
          <Emblem innerIcon={faFlaskPotion} />
          <h3 className="mb-0">{item.name}</h3>
        </div>
        <span className="ms-2">
          <WeaponSlots weaponSlots={item.weaponSlotsUsed} />
        </span>
      </Card.Header>
      <Card.Body>
        {item.permanentEffect.length === 0 ? (
          <Fragment>
            <Badge className="me-1" bg={badgeBackground}>
              <span>{item.element}</span>&nbsp;
            </Badge>
            {item.affinityStats.map((affinityStat) => (
              <Badge className="me-1" bg={badgeBackground} key={`${affinityStat.affinity}-${affinityStat.stat}`}>
                {affinityStat.affinity}
                &nbsp;+{affinityStat.stat}
              </Badge>
            ))}
          </Fragment>
        ) : null}
        {item.permanentEffect.length > 0 ? (
          <div>
            Permanent Effect: <span>{item.permanentEffect}</span>&nbsp;
          </div>
        ) : null}
      </Card.Body>
      {item.description.length > 0 ? (
        <Card.Footer>
          <em>{item.description}</em>
        </Card.Footer>
      ) : null}
    </Card>
  );
};

export default ItemViewer;
