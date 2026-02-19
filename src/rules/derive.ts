import type { Character } from "../models/character";
import { getClassById } from "../data/loadClasses";
import { getTalentsByIds } from "../data/loadTalents";
import { applyModifiers } from "./modifiers";

export type DerivedCharacter = {
  displayName: string;
  warnings: string[];
  stats: {
    hp: number;
    def: number;
    atk: number;
  } | null;
};

export function deriveCharacter(c: Character): DerivedCharacter {
  const warnings: string[] = [];

  if (!c.name.trim()) warnings.push("Name is empty.");

  const classDef = getClassById(c.classId);
  if (!classDef) warnings.push("No class selected.");

  // Rule: pick up to 2 talents
  if (c.talentIds.length === 0) warnings.push("Select at least 1 talent.");
  if (c.talentIds.length > 2) warnings.push("Select no more than 2 talents.");

  if (!classDef) {
    return {
      displayName: c.name.trim() || "Unnamed Character",
      warnings,
      stats: null,
    };
  }

  const talents = getTalentsByIds(c.talentIds);

  // Gather modifiers from all selected talents
  const talentMods = talents.flatMap((t) => t.modifiers);

  // Start with base stats (copy) then apply mods
  const stats = applyModifiers({ ...classDef.base }, talentMods);

  return {
    displayName: c.name.trim() || "Unnamed Character",
    warnings,
    stats,
  };
}
