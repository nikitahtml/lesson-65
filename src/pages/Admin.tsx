import React, { useEffect, useState } from 'react';
import axiosApi from '../axiosApi';
import { useNavigate, useLocation } from 'react-router-dom';

interface PageData {
    title: string;
    content: string;
}

interface Pages {
    [key: string]: PageData;
}

const Admin: React.FC = () => {
    const [pages, setPages] = useState<Pages>({});
    const [selectedPage, setSelectedPage] = useState<string>('');
    const [pageData, setPageData] = useState<PageData>({ title: '', content: '' });


    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await axiosApi.get('/pages.json');
                setPages(response.data || {});
            } catch (error) {
                console.error('Error fetching pages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPages();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const editPage = params.get('edit');
        if (editPage && pages[editPage]) {
            setSelectedPage(editPage);
            setPageData(pages[editPage]);
        }
    }, [location.search, pages]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const pageName = e.target.value;
        setSelectedPage(pageName);
        if (pages[pageName]) {
            setPageData(pages[pageName]);
        } else {
            setPageData({ title: '', content: '' });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPageData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosApi.put(`/pages/${selectedPage}.json`, pageData);
            navigate(`/pages/${selectedPage}`);
        } catch (error) {
            console.error('Error updating page data:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (


        <div>
            <h1>Editor</h1>
            <form onSubmit={handleSubmit}>
                <select value={selectedPage} onChange={handleSelectChange}>
                    <option value="">Select a page</option>
                    {Object.keys(pages).map((page) => (
                        <option key={page} value={page}>
                            {pages[page].title}
                        </option>
                    ))}
                </select>

                {selectedPage && (
                    <>
                        <div>
                            <label>
                                Title:
                                <input type="text" name="title" value={pageData.title || ''} onChange={handleInputChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Content:
                                <textarea name="content" value={pageData.content || ''} onChange={handleInputChange} />
                            </label>
                        </div>
                        <button type="submit">Save</button>
                    </>
                )}
            </form>
        </div>
    );
};


export default Admin;
