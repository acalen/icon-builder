import type { Character } from "../models/character";
import { getClassById } from "../data/loadClasses";
import { getTalentsByIds } from "../data/loadTalents";
import { getGearByIds } from "../data/loadGear";
import { applyModifiers, type Stats } from "./modifiers";
import { computeFromStats, type ComputedStats } from "./compute";
import { checkRequirements } from "./validate";

export type DerivedCharacter = {
  displayName: string;
  warnings: string[];
  stats: Stats | null;
  computed: ComputedStats | null;
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
      computed: null,
    };
  }

  const talents = getTalentsByIds(c.talentIds);
  const gear = getGearByIds(c.gearIds);

  const talentMods = talents.flatMap((t) => t.modifiers);
  const gearMods = gear.flatMap((g) => g.modifiers);
  const allMods = [...talentMods, ...gearMods];

  const stats = applyModifiers({ ...classDef.base }, allMods);
  const computed = computeFromStats(stats);

  // Validate selected talents against current stats
  const talentIssues = talents.flatMap((t) => checkRequirements(c, stats, t.requires));
  if (talentIssues.length > 0) {
    warnings.push(...talentIssues.map((i) => i.message));
  }

  return {
    displayName: c.name.trim() || "Unnamed Character",
    warnings,
    stats,
    computed,
  };
}