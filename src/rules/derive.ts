import type { Character } from "../models/character";
import { getClassById } from "../data/loadClasses";
import { getTalentById } from "../data/loadTalents";

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

  const talentDef = getTalentById(c.talentId);
  if (!talentDef) warnings.push("Select exactly 1 talent.");

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
  if (talentDef) {
    stats.hp += talentDef.modifiers.hp ?? 0;
    stats.def += talentDef.modifiers.def ?? 0;
    stats.atk += talentDef.modifiers.atk ?? 0;
  }

  return {
    displayName: c.name.trim() || "Unnamed Character",
    warnings,
    stats,
  };
}
