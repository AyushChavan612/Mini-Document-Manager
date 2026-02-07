import React from 'react';
import { useDocuments } from './hooks/useDocuments';
import UploadSection from './components/UploadSection'; 

function App() {
  const { 
    docs, loading, error, 
    search, setSearch, 
    sortBy, setSortBy, 
    order, setOrder,
    page, setPage, 
    totalPages,
    refresh 
  } = useDocuments();

  const toggleOrder = () => {
    setOrder(order === 'ASC' ? 'DESC' : 'ASC');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Mini File Manager</h1>
      
      {/* New Upload Section */}
      <UploadSection onUploadSuccess={refresh} />

      {/* Existing Search and Sort UI */}
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

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span>Sort By:</span>
        <button onClick={() => setSortBy('title')}>Name</button>
        <button onClick={() => setSortBy('size')}>Size</button>
        <button onClick={() => setSortBy('created_at')}>Date</button>
        <button onClick={toggleOrder} style={{ backgroundColor: '#eee' }}>
          {order === 'ASC' ? '↑ Low to High' : '↓ High to Low'}
        </button>
      </div>

      {/*List and Pagination */}
      {loading && <p>Loading...</p>}
      <ul>
        {docs.map(doc => (
          <li key={doc.id} style={{ marginBottom: '8px' }}>
            <strong>{doc.title}</strong> - {(doc.size / 1024).toFixed(2)} KB
          </li>
        ))}
      </ul>

      {!loading && docs.length > 0 && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span style={{ margin: '0 15px' }}>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;