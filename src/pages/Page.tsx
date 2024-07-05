import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosApi from '../axiosApi';

const Page: React.FC = () => {
    const { pageName } = useParams<{ pageName: string }>();
    const [pageData, setPageData] = useState<{ title: string; content: string } | null>(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await axiosApi.get(`/pages/${pageName}.json`);
                setPageData(response.data);
            } catch (error) {
                console.error('Error fetching page data:', error);
            } finally {
                setLoading(false);
            }
        };



        fetchPageData();
    }, [pageName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pageData) {
        return <div>Error: Page not found</div>;
    }

    return (
        <div>
            <h1>{pageData.title}</h1>
            <p>{pageData.content}</p>
            <Link to={`/pages/admin?edit=${pageName}`}>
                <button>Edit</button>
            </Link>
        </div>
    );
};

export default Page;
