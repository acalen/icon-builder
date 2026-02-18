import type { Character } from "../models/character";

export type DerivedCharacter = {
  displayName: string;
  warnings: string[];
};

export function deriveCharacter(c: Character): DerivedCharacter {
  const warnings: string[] = [];
  if (!c.name.trim()) warnings.push("Name is empty.");
  if (!c.classId) warnings.push("No class selected (placeholder).");

  return {
    displayName: c.name.trim() ? c.name.trim() : "Unnamed Character",
    warnings,
  };
}
