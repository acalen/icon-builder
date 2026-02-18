import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharacterListPage } from "../pages/CharacterListPage";
import { CharacterEditorPage } from "../pages/CharacterEditorPage";
import { StoreProvider } from "./store";

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

