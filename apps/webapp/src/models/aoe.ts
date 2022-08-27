import { Coordinate } from "./coordinate";

export type AOE = {
  total: number;
  configuration: (Coordinate & {
    effected: boolean;
  })[];
};
