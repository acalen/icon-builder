import type { Character } from "../models/character";

const STORAGE_KEY = "icon_builder.characters.v1";

export function loadCharacters(): Character[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as Character[];
  } catch {
    return [];
  }
}

export function saveCharacters(chars: Character[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chars));
}
