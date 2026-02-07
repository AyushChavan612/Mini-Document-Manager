import React from 'react';
import { useDocuments } from './hooks/useDocuments';

function App() {
  const { docs, loading, error, search, setSearch } = useDocuments();

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>File Manager Test</h1>
      
      {/* Search Input Test */}
      <input 
        type="text" 
        placeholder="Search files..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
      />

      {loading && <p>Loading data from backend...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {docs.map(doc => (
          <li key={doc.id}>
            <strong>{doc.title}</strong> - {(doc.size / 1024).toFixed(2)} KB
          </li>
        ))}
      </ul>

      {!loading && docs.length === 0 && <p>No files found matching your search.</p>}
    </div>
  );
}

export default App;