import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./app/store";
import { CharacterListPage } from "./pages/CharacterListPage";
import { CharacterEditorPage } from "./pages/CharacterEditorPage";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterListPage />} />
          <Route path="/c/:id" element={<CharacterEditorPage />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
