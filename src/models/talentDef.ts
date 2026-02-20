import type { Modifier } from "./modifier";
import type { Requirement } from "./requirement";

export type TalentId = string;

export type TalentDef = {
  id: TalentId;
  name: string;
  description: string;
  modifiers: Modifier[];
  requires?: Requirement[];
};