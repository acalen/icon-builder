import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../app/store";
import { deriveCharacter } from "../rules/derive";

const CLASS_OPTIONS = [
  { id: "warden", label: "Warden (placeholder)" },
  { id: "striker", label: "Striker (placeholder)" },
  { id: "mystic", label: "Mystic (placeholder)" },
];

export function CharacterEditorPage() {
  const { id } = useParams();
  const { state, dispatch } = useStore();

  const character = state.characters.find((c) => c.id === id);
  const derived = useMemo(() => (character ? deriveCharacter(character) : null), [character]);

  if (!character) {
    return (
      <div style={{ padding: 24 }}>
        <Link to="/">← Back</Link>
        <h1>Character not found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link to="/">← Back</Link>
        <h1 style={{ margin: 0 }}>{derived?.displayName}</h1>
      </header>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <section style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Editor</h2>

          <label style={{ display: "grid", gap: 6, marginBottom: 12 }}>
            <span>Name</span>
            <input
              value={character.name}
              onChange={(e) =>
                dispatch({ type: "character/update", id: character.id, patch: { name: e.target.value } })
              }
            />
          </label>

          <label style={{ display: "grid", gap: 6, marginBottom: 12 }}>
            <span>Concept</span>
            <textarea
              rows={4}
              value={character.concept}
              onChange={(e) =>
                dispatch({ type: "character/update", id: character.id, patch: { concept: e.target.value } })
              }
            />
          </label>

          <label style={{ display: "grid", gap: 6, marginBottom: 12 }}>
            <span>Class (placeholder)</span>
            <select
              value={character.classId ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "character/update",
                  id: character.id,
                  patch: { classId: e.target.value ? e.target.value : null },
                })
              }
            >
              <option value="">— Select —</option>
              {CLASS_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          {derived && derived.warnings.length > 0 ? (
            <div style={{ marginTop: 12, padding: 10, border: "1px solid #f0c", borderRadius: 8 }}>
              <b>Warnings</b>
              <ul style={{ margin: "8px 0 0 18px" }}>
                {derived.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Live Sheet (Debug View)</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {JSON.stringify({ character, derived }, null, 2)}
          </pre>
        </section>
      </div>
    </div>
  );
}
