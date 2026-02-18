import { Link } from "react-router-dom";
import { useStore } from "../app/store";

export function CharacterListPage() {
  const { state, dispatch } = useStore();

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Characters</h1>
        <button onClick={() => dispatch({ type: "character/create" })}>New Character</button>
      </header>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {state.characters.length === 0 ? (
          <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            No characters yet. Click <b>New Character</b>.
          </div>
        ) : (
          state.characters.map((c) => (
            <div key={c.id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{c.name}</div>
                  <div style={{ opacity: 0.7, fontSize: 12 }}>
                    Updated: {new Date(c.updatedAt).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Link to={`/c/${c.id}`}>Open</Link>
                  <button onClick={() => dispatch({ type: "character/duplicate", id: c.id })}>
                    Duplicate
                  </button>
                  <button onClick={() => dispatch({ type: "character/delete", id: c.id })}>
                    Delete
                  </button>
                </div>
              </div>

              {c.concept ? <div style={{ marginTop: 8 }}>{c.concept}</div> : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
