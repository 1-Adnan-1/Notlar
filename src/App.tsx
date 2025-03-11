import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import { Note, NoteData, Tag } from "./types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { v4 } from "uuid";
import Layout from "./components/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  // Tag ekleme fonksiyonu
  const createTag = (tag: Tag): void => {
    setTags((prev) => [...prev, tag]);
  };

  // Yeni not ekleme fonksiyonu
  const createNote = (noteData: NoteData): void => {
    const newNote: Note = { id: v4(), ...noteData };
    setNotes((prev) => [...prev, newNote]);

    // Not başarıyla eklendiğinde siyah arka planlı toast mesajı göster
    toast.success("Not başarıyla eklendi!", {
      autoClose: 500,
      style: {
        backgroundColor: "#000000",
        color: "#ffffff",
      },
    });
  };

  // Silme fonksiyonu
  const deleteNote = (id: string): void => {
    // Silme işlemi
    setNotes((prev) => prev.filter((i) => i.id !== id));

    // toast mesajı göster
    toast.success("Not başarıyla silindi!", {
      autoClose: 500,
      style: {
        backgroundColor: "#000000",
        color: "#ffffff",
      },
    });
  };

  // Güncelleme fonksiyonu
  const updateNote = (id: string, updatedData: NoteData): void => {
    const updatedArr = notes.map((note) =>
      note.id === id ? { id, ...updatedData } : note
    );
    setNotes(updatedArr);
    toast.success("Not başarıyla güncellendi!", {
      autoClose: 500,
      style: {
        backgroundColor: "#000000",
        color: "#ffffff",
      },
    });
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Ana kapsayıcı */}
        <Routes>
          <Route
            path="/"
            element={<Main notes={notes} availableTags={tags} />}
          />
          <Route
            path="/new"
            element={
              <Create
                createTag={createTag}
                handleSubmit={createNote}
                availableTags={tags}
              />
            }
          />
          <Route path="/note/:id" element={<Layout notes={notes} />}>
            <Route index element={<Detail deleteNote={deleteNote} />} />
            <Route
              path="edit"
              element={
                <Edit
                  handleSubmit={updateNote}
                  createTag={createTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
        </Routes>
        <ToastContainer
          style={{
            top: "5px",
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
