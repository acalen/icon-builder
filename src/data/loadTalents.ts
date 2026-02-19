import type { TalentDef } from "../models/talentDef";
import raw from "./talents.json";

export const TALENTS: TalentDef[] = raw as TalentDef[];

export function getTalentById(id: string | null): TalentDef | undefined {
  if (!id) return undefined;
  return TALENTS.find((t) => t.id === id);
}

export function getTalentsByIds(ids: string[]): TalentDef[] {
  const set = new Set(ids);
  return TALENTS.filter(t => set.has(t.id));
}
