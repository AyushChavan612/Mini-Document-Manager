import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
    if (totalPages <= 1) return null;

    return (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span style={{ margin: '0 15px' }}>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default Pagination;