import { useState } from 'react';
import { FaBars, FaPlusCircle, FaTimes, FaTrashAlt } from 'react-icons/fa';

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className={`app-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
      <div className="app-sidebar-header">
        <button className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        {sidebarOpen && <h1>Noti</h1>}
        {sidebarOpen && (
          <button onClick={onAddNote}><FaPlusCircle/></button>
        )}
      </div>
      {sidebarOpen && (
        <div className="app-sidebar-notes">
          {sortedNotes.map(({ id, title, body, lastModified }, i) => (
            <div
                key={id} // unique key
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
                <button onClick={(e) => {
                    e.stopPropagation(); // stop setActiveNote from being triggered
                    onDeleteNote(id);
                }}>
                  <FaTrashAlt/>
                </button>
              </div>

              <p>{body && body.substr(0, 100) + "..."}</p>
              <small className="note-meta">
                Last Modified{" "}
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
