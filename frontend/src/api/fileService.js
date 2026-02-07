import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

//Uploads multiple files to the server.
export const uploadFiles = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
        formData.append('files', file); 
    });

    const response = await axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};


//Fetches paginated, sorted, and filtered documents.
export const getDocuments = async (page = 1, limit = 5, search = '', sortBy = 'created_at', order = 'DESC') => {
    const params = {
        page,
        limit,
        q: search,
        sortBy,
        order
    };
    
    const response = await axios.get(API_URL, { params });
    return response.data;
};


//Triggers a browser-native streaming download.
export const downloadDocument = (id, title) => {
    const link = document.createElement('a');
    link.href = `${API_URL}/${id}/download`;
    link.setAttribute('download', title);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};