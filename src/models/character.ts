export type CharacterId = string;

export type Character = {
  id: CharacterId;
  name: string;
  concept: string;
  classId: string | null;   // placeholder until we implement ICON real options
  talentIds: string[];
  createdAt: string;        // ISO timestamp
  updatedAt: string;        // ISO timestamp
};

export function newCharacter(): Character {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: "New Character",
    concept: "",
    classId: null,
    talentIds: [],
    createdAt: now,
    updatedAt: now,
  };
}
