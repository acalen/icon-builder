import type { TalentDef } from "../models/talentDef";
import raw from "./talents.json";

export const TALENTS: TalentDef[] = raw as TalentDef[];

export function getTalentById(id: string | null): TalentDef | undefined {
  if (!id) return undefined;
  return TALENTS.find((t) => t.id === id);
}
