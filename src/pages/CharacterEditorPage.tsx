import { Link, useParams } from "react-router-dom";

export function CharacterEditorPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: 24 }}>
      <Link to="/">← Back</Link>
      <h1>Editor</h1>
      <p>Character ID: {id}</p>
    </div>
  );
}
