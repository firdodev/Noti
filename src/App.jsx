// App.js
import { useEffect, useState, useMemo } from "react";
import uuid from "react-uuid";
import { ThemeContext } from './main/ThemeContext';
import "./css/App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState({});
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    document.body.dataset.theme = theme; // change the dataset attribute for the body
  }, [notes, theme]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote) || {};
  };

  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="App">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;