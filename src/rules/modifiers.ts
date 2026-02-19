import type { Modifier } from "../models/modifier";

export type Stats = { hp: number; def: number; atk: number };

export function applyModifiers(base: Stats, modifiers: Modifier[]): Stats {
  const out: Stats = { ...base };

  for (const m of modifiers) {
    if (m.type === "stat") {
      out[m.stat] += m.value;
    }
  }

  return out;
}

