import type { Modifier } from "./modifier";

export type TalentId = string;

export type TalentDef = {
  id: TalentId;
  name: string;
  description: string;
  modifiers: Modifier[];
};
