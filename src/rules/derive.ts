import type { Character } from "../models/character";
import { getClassById } from "../data/loadClasses";
import { getTalentsByIds } from "../data/loadTalents";

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

  const talents = getTalentsByIds(c.talentIds);

  // Rule: up to 2 talents
  if (c.talentIds.length === 0) warnings.push("Select at least 1 talent.");
  if (c.talentIds.length > 2) warnings.push("Select no more than 2 talents.");


  if (!classDef) {
    return {
      displayName: c.name.trim() || "Unnamed Character",
      warnings,
      stats: null,
    };
  }

  // Start with base stats (copy to avoid mutation)
  const stats = { ...classDef.base };

  // Apply talent modifiers if present
  for (const t of talents) {
    stats.hp += t.modifiers.hp ?? 0;
    stats.def += t.modifiers.def ?? 0;
    stats.atk += t.modifiers.atk ?? 0;
  }

  return {
    displayName: c.name.trim() || "Unnamed Character",
    warnings,
    stats,
  };
}
