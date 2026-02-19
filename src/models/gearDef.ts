import type { Modifier } from "./modifier";

export type GearId = string;

export type GearDef = {
  id: GearId;
  name: string;
  description: string;
  modifiers: Modifier[];
};
