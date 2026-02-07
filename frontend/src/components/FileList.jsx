import React from 'react';
import { downloadDocument } from '../api/fileService';

const FileList = ({ docs = [], loading, error, selectedIds, onToggleSelect }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!docs || docs.length === 0) return <p>No files found.</p>;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {docs.map(doc => (
                <li key={doc.id} style={{
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid #eee',
                    backgroundColor: selectedIds.includes(doc.id) ? '#e6f7ff' : 'transparent'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                        <input 
                            type="checkbox" 
                            checked={selectedIds.includes(doc.id)}
                            onChange={() => onToggleSelect(doc.id)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '16px', fontWeight: '500' }}>
                                {doc.title}
                            </span>
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                {(doc.size / 1024).toFixed(2)} KB • {formatDate(doc.created_at)}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => downloadDocument(doc.id, doc.title)}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginLeft: '10px'
                        }}
                    >
                        Download
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default FileList;