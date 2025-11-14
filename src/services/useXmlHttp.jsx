// src/services/useXmlHttp.jsx
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

const useXmlHttp = (url, method = "GET", customHeaders = {}) => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const headers = {
                    'Content-Type': 'application/json',
                    ...customHeaders
                };

                // Add authorization header if user is authenticated
                if (user?.jwt) {
                    headers['Authorization'] = `Bearer ${user.jwt}`;
                }

                const response = await fetch(url, {
                    method,
                    headers,
                    signal
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (url) {
            fetchData();
        }

        return () => {
            controller.abort();
        };
    }, [url, method, JSON.stringify(customHeaders), user?.jwt]);

    return { data, error, isLoading };
};

export default useXmlHttp;