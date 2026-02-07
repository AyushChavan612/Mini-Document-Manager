import React from 'react';
import { useDocuments } from './hooks/useDocuments';

function App() {
  const { 
    docs, loading, error, 
    search, setSearch, 
    sortBy, setSortBy, 
    order, setOrder,
    page, setPage, 
    totalPages 
  } = useDocuments();

  const toggleOrder = () => {
    setOrder(order === 'ASC' ? 'DESC' : 'ASC');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>File Manager Test</h1>
      
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search files..." 
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); 
        }}
        style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
      />

      {/* Simple Sorting Button */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span>Sort By:</span>
        <button onClick={() => setSortBy('title')}>Name</button>
        <button onClick={() => setSortBy('size')}>Size</button>
        <button onClick={() => setSortBy('created_at')}>Date</button>
        <button onClick={toggleOrder} style={{ marginLeft: '10px', backgroundColor: '#eee' }}>
          {order === 'ASC' ? '↑ Low to High' : '↓ High to Low'}
        </button>
      </div>

      {loading && <p>Loading data from backend...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {docs.map(doc => (
          <li key={doc.id} style={{ marginBottom: '8px' }}>
            <strong>{doc.title}</strong> - {(doc.size / 1024).toFixed(2)} KB
          </li>
        ))}
      </ul>

      {/* pagination control */}
      {!loading && docs.length > 0 && (
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center' }}>
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          
          <span>Page {page} of {totalPages}</span>

          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}

      {!loading && docs.length === 0 && <p>No files found matching your search.</p>}
    </div>
  );
}

export default App;