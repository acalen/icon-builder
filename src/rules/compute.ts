import type { Stats } from "./modifiers";

export type ComputedStats = {
  finalHp: number;
};

export function computeFromStats(stats: Stats): ComputedStats {
  return {
    finalHp: stats.hp + stats.def * 2,
  };
}
