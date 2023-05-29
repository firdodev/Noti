import { FaColumns } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import * as React from 'react';

const Main = ({ activeNote, onUpdateNote }) => {
    const [showPreview, setShowPreview] = React.useState(false);
  
    const onEditField = (field, value) => {
      onUpdateNote({
        ...activeNote,
        [field]: value,
        lastModified: Date.now(),
      });
    };
  
    if (!activeNote.id) return <div className="no-active-note">No Active Noti's</div>;
  
    return (
        <div className="app-main">
          <div className={`app-main-note-edit ${showPreview ? 'half' : 'full'}`}>
            <input
              type="text"
              id="title"
              placeholder="Note Title"
              value={activeNote.title}
              onChange={(e) => onEditField("title", e.target.value)}
              autoFocus
            />
            <textarea
              id="body"
              placeholder="Write your note here..."
              value={activeNote.body}
              onChange={(e) => onEditField("body", e.target.value)}
            />
          </div>
          {showPreview && (
            <div className={`app-main-note-preview ${showPreview ? 'shown' : 'hidden'}`}>
              <h1 className="preview-title">{activeNote.title}</h1>
              <ReactMarkdown className="markdown-preview">
                {activeNote.body}
              </ReactMarkdown>
            </div>
          )}
          <button className="toggle-preview" onClick={() => setShowPreview(!showPreview)}>
            <FaColumns />
          </button>
        </div>
      );
      
  };
  

export default Main;
