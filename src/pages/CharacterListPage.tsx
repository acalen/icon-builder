import { Link } from "react-router-dom";

export function CharacterListPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Characters</h1>
      <p>This will become the character list.</p>

      <Link to="/c/demo">Open demo character</Link>
    </div>
  );
}
