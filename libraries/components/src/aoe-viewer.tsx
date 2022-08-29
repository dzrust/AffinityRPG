import { FC, useMemo } from "react";
import { AOE } from "@affinity-rpg/models/aoe";

type Props = {
  aoe: AOE;
};

const AOEViewer: FC<Props> = ({ aoe }) => {
  const xPlane = useMemo(() => {
    let maxX = 0;
    aoe.configuration.forEach((config) => {
      if (config.effected && config.x > maxX) {
        maxX = config.x;
      }
    });
    return ([] as number[]).fill(0, 0, maxX);
  }, [aoe]);

  const yPlane = useMemo(() => {
    let maxY = 0;
    aoe.configuration.forEach((config) => {
      if (config.effected && config.y > maxY) {
        maxY = config.y;
      }
    });
    return ([] as number[]).fill(0, 0, maxY);
  }, [aoe]);

  // const effectedSquares = useMemo(() => {
  //   const effectedSquaresMap = new Map<string, boolean>();
  //   aoe.configuration.forEach((config) => {
  //     const key = `${config.x},${config.y}`;
  //     if (effectedSquaresMap.has(key)) {
  //       throw "Check your input. It apepars to be invalid";
  //     }
  //     effectedSquaresMap.set(key, config.effected);
  //   });
  // }, [aoe]);
  return (
    <table>
      <tbody>
        {xPlane.map((_, index) => (
          <tr key={`x-${index}`}>
            {yPlane.map((_1, index) => (
              <td key={`y-${index}`}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AOEViewer;
