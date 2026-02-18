import type { ClassDef } from "../models/classDef";
import raw from "./classes.json";

export const CLASSES: ClassDef[] = raw as ClassDef[];

export function getClassById(id: string | null): ClassDef | undefined {
  if (!id) return undefined;
  return CLASSES.find((c) => c.id === id);
}
