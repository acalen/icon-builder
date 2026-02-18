import type { Character } from "../models/character";
import { getClassById } from "../data/loadClasses";

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

  return {
    displayName: c.name.trim() ? c.name.trim() : "Unnamed Character",
    warnings,
    stats: classDef ? { ...classDef.base } : null,
  };
}
