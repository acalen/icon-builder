import type { Character } from "../models/character";

const STORAGE_KEY = "icon_builder.characters.v1";

function normalizeCharacter(raw: any): Character | null {
  if (!raw || typeof raw !== "object") return null;

  // Basic required fields (keep minimal)
  const id = String(raw.id ?? "");
  if (!id) return null;

  const now = new Date().toISOString();

  // Migration: talentId -> talentIds
  const talentIds =
    Array.isArray(raw.talentIds) ? raw.talentIds.map(String) :
    raw.talentId ? [String(raw.talentId)] :
    [];

  const gearIds = 
    Array.isArray(raw.gearIds) ? raw.gearIds.map(String) : [];

  return {
    id,
    name: String(raw.name ?? "New Character"),
    concept: String(raw.concept ?? ""),
    classId: raw.classId ? String(raw.classId) : null,
    talentIds,
    gearIds,
    createdAt: String(raw.createdAt ?? now),
    updatedAt: String(raw.updatedAt ?? now),
  };
}

export function loadCharacters(): Character[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeCharacter)
      .filter((c): c is Character => c !== null);
  } catch {
    return [];
  }
}

export function saveCharacters(chars: Character[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chars));
}
