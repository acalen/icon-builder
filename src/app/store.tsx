import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Character, CharacterId } from "../models/character";
import { newCharacter } from "../models/character";
import { loadCharacters, saveCharacters } from "../storage/localCharacters";

type State = {
  characters: Character[];
};

type Action =
  | { type: "character/create" }
  | { type: "character/delete"; id: CharacterId }
  | { type: "character/duplicate"; id: CharacterId }
  | { type: "character/update"; id: CharacterId; patch: Partial<Omit<Character, "id" | "createdAt">> };

function touch(c: Character): Character {
  return { ...c, updatedAt: new Date().toISOString() };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "character/create": {
      const created = newCharacter();
      return { characters: [created, ...state.characters] };
    }
    case "character/delete": {
      return { characters: state.characters.filter((c) => c.id !== action.id) };
    }
    case "character/duplicate": {
      const original = state.characters.find((c) => c.id === action.id);
      if (!original) return state;
      const copy: Character = touch({
        ...original,
        id: crypto.randomUUID(),
        name: `${original.name} (Copy)`,
        createdAt: new Date().toISOString(),
      });
      return { characters: [copy, ...state.characters] };
    }
    case "character/update": {
      return {
        characters: state.characters.map((c) =>
          c.id === action.id ? touch({ ...c, ...action.patch }) : c
        ),
      };
    }
    default:
      return state;
  }
}

const StoreCtx = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    characters: loadCharacters(),
  }));

  useEffect(() => {
    saveCharacters(state.characters);
  }, [state.characters]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
