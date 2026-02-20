import type { Character } from "../models/character";
import type { Requirement } from "../models/requirement";
import type { Stats } from "./modifiers";

export type ValidationIssue = {
  code: string;
  message: string;
};

export function checkRequirements(
  c: Character,
  stats: Stats | null,
  reqs: Requirement[] | undefined
): ValidationIssue[] {
  if (!reqs || reqs.length === 0) return [];

  const issues: ValidationIssue[] = [];

  for (const r of reqs) {
    switch (r.type) {
      case "hasClass":
        if (c.classId !== r.classId) {
          issues.push({
            code: "REQ_HAS_CLASS",
            message: `Requires class: ${r.classId}`,
          });
        }
        break;

      case "minStat": {
        if (!stats) {
          issues.push({
            code: "REQ_MIN_STAT",
            message: `Requires ${r.stat} ≥ ${r.value}`,
          });
        } else if (stats[r.stat] < r.value) {
          issues.push({
            code: "REQ_MIN_STAT",
            message: `Requires ${r.stat} ≥ ${r.value}`,
          });
        }
        break;
      }

      default:
        return issues;
    }
  }

  return issues;
}