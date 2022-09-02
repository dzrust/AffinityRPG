import { faBriefcase, faSack, faHeartPulse, faBoot } from "@fortawesome/pro-regular-svg-icons";
import { FC } from "react";
import { Badge } from "react-bootstrap";
import { Hero } from "@affinity-rpg/models";
import { AffinityEmblem } from "../affinity/affinity-emblem";
import { Emblem } from "../emblem";

type Props = {
  hero: Partial<Hero> & { movement?: number };
};
export const HeroDescription: FC<Props> = ({ hero }) => {
  return (
    <div className="hero-sheet__description-container">
      <Badge className="hero-sheet__description-badge" bg="primary">
        {hero.race}
      </Badge>
      <Badge className="hero-sheet__description-badge" bg="primary">
        {hero.heroClass}
      </Badge>
      {hero.job && hero.job.length > 0 ? (
        <Badge className="hero-sheet__description-badge" bg="primary">
          <Emblem innerIcon={faBriefcase} /> {hero.job}
        </Badge>
      ) : null}
      {!!hero.money ? (
        <Badge className="hero-sheet__description-badge" bg="primary">
          <Emblem innerIcon={faSack} /> {hero.money}MU
        </Badge>
      ) : null}
      {hero.affinity ? (
        <Badge className="hero-sheet__description-badge" bg="primary">
          <AffinityEmblem type={hero.affinity} /> {hero.affinity}
        </Badge>
      ) : null}
      {!!hero.currentHealth && !!hero.totalHealth ? (
        <Badge className="hero-sheet__description-badge" bg="primary">
          <Emblem innerIcon={faHeartPulse} /> {hero.currentHealth} / {hero.totalHealth}
        </Badge>
      ) : null}
      {!!hero.movement && !!hero.baseMovement ? (
        <Badge className="hero-sheet__description-badge" bg="primary">
          <Emblem innerIcon={faBoot} />
          {hero.baseMovement + hero.movement}DU
        </Badge>
      ) : null}
      {!!hero.experience ? (
        <Badge className="hero-sheet__description-badge" bg="primary">
          {hero.experience}XP
        </Badge>
      ) : null}
      {hero.level ? (
        <Badge className="hero-sheet__description-badge" bg="primary">
          LVL:&nbsp;
          {hero.level}
        </Badge>
      ) : null}
    </div>
  );
};
