import React from 'react';

const FileToolbar = ({ 
    search, setSearch, 
    setSortBy, toggleOrder, order, 
    selectedCount, onBulkDownload 
}) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            {/* Bulk Download Action */}
            <div style={{ padding: '10px', backgroundColor: '#f9f9f9', marginBottom: '15px', borderRadius: '5px' }}>
                <button 
                    onClick={onBulkDownload} 
                    disabled={selectedCount === 0}
                    style={{
                        backgroundColor: selectedCount > 0 ? '#007bff' : '#ccc',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: selectedCount > 0 ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold'
                    }}
                >
                    Download Selected ({selectedCount})
                </button>
            </div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: '10px', width: '100%', marginBottom: '15px' }}
            />

            {/* Sorting Controls */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span>Sort By:</span>
                <button onClick={() => setSortBy('title')}>Name</button>
                <button onClick={() => setSortBy('size')}>Size</button>
                <button onClick={() => setSortBy('created_at')}>Date</button>
                <button onClick={toggleOrder} style={{ backgroundColor: '#eee' }}>
                    {order === 'ASC' ? '↑ Low to High' : '↓ High to Low'}
                </button>
            </div>
        </div>
    );
};

export default FileToolbar;