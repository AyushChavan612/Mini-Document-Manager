import React, { useState } from 'react';
import { useDocuments } from './hooks/useDocuments';
import UploadSection from './components/UploadSection';
import FileToolbar from './components/FileToolbar'; 
import FileList from './components/FileList';       
import Pagination from './components/Pagination';   

function App() {
  const {
    docs, loading, error, refresh,
    search, setSearch,
    setSortBy, order, setOrder,
    page, setPage, totalPages
  } = useDocuments();

  const [selectedIds, setSelectedIds] = useState([]);

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDownload = () => {
    if (selectedIds.length === 0) return;
    window.location.href = `http://localhost:3000/api/bulk-download?ids=${selectedIds.join(',')}`;
  };

  const toggleOrder = () => setOrder(order === 'ASC' ? 'DESC' : 'ASC');

  return (
    <div className="container">
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Mini File Manager</h1>

        <UploadSection onUploadSuccess={refresh} />

        <FileToolbar 
          search={search}
          setSearch={setSearch}
          setSortBy={setSortBy}
          toggleOrder={toggleOrder}
          order={order}
          selectedCount={selectedIds.length}
          onBulkDownload={handleBulkDownload}
        />

        <FileList 
          docs={docs}
          loading={loading}
          error={error}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
        />

        <Pagination 
          page={page} 
          totalPages={totalPages} 
          setPage={setPage} 
        />
      </div>
    </div>
  );
}

export default App;