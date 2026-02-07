import { useState, useEffect, useCallback } from 'react';
import { getDocuments } from '../api/fileService';

export const useDocuments = () => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // State for UI controls
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('created_at');
    const [order, setOrder] = useState('DESC');

    const fetchDocs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // We use a limit of 5 to make testing pagination easier
            const data = await getDocuments(page, 10, search, sortBy, order);
            setDocs(data.documents);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError('Could not connect to the backend server.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [page, search, sortBy, order]);

    useEffect(() => {
        // Debounce: Wait 500ms after user stops typing to hit the API
        const delaySearch = setTimeout(() => {
            fetchDocs();
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [fetchDocs]);

    return {
        docs,
        loading,
        error,
        page, setPage,
        totalPages,
        search, setSearch,
        sortBy, setSortBy,
        order, setOrder,
        refresh: fetchDocs
    };
};