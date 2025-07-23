import React, { useState } from 'react';

const initialData = {
  name: 'root',
  type: 'folder',
  children: [
    { name: 'Document.pdf', type: 'file' },
    { name: 'Photos', type: 'folder', children: [
      { name: 'Vacation.png', type: 'file' }
    ] },
    { name: 'Resume.docx', type: 'file' },
    { name: 'Projects', type: 'folder', children: [] }
  ]
};

const FileManager = () => {
  const [currentFolder, setCurrentFolder] = useState(initialData);
  const [history, setHistory] = useState([]);
  const [folderContent, setFolderContent] = useState(initialData.children);

  const openFolder = (folder) => {
    setHistory([...history, currentFolder]);
    setCurrentFolder(folder);
    setFolderContent(folder.children);
  };

  const goBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentFolder(prev);
    setFolderContent(prev.children);
  };

  const uploadFile = () => {
    const fileName = prompt('Enter new file name (e.g. MyFile.txt):');
    if (fileName) {
      const newFile = { name: fileName, type: 'file' };
      const updated = [...folderContent, newFile];
      setFolderContent(updated);
      currentFolder.children = updated; // update actual tree
    }
  };

  const deleteItem = (index) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      const updated = [...folderContent];
      updated.splice(index, 1);
      setFolderContent(updated);
      currentFolder.children = updated;
    }
  };

  const renameItem = (index) => {
    const newName = prompt('Enter new name:');
    if (newName) {
      const updated = [...folderContent];
      updated[index].name = newName;
      setFolderContent(updated);
      currentFolder.children = updated;
    }
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={goBack} disabled={history.length === 0}>⬅ Back</button>
        <button onClick={uploadFile}>➕ Upload File</button>
      </div>

      <div className="file-grid">
        {folderContent.map((item, index) => (
          <div key={index} className="file-card">
            <div
              className="file-icon"
              onClick={() => item.type === 'folder' && openFolder(item)}
            >
              {item.type === 'folder' ? '📁' : '📄'}
            </div>
            <div className="file-name">{item.name}</div>
            <div className="file-actions">
              <button onClick={() => renameItem(index)}>✏</button>
              <button onClick={() => deleteItem(index)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;