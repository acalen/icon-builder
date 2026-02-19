import type { GearDef } from "../models/gearDef";
import raw from "./gear.json";

export const GEAR: GearDef[] = raw as GearDef[];

export function getGearByIds(ids: string[]): GearDef[] {
  const set = new Set(ids);
  return GEAR.filter(g => set.has(g.id));
}
