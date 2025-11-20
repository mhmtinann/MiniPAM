import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Redirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const to = params.get('to') || '/';
        const delay = parseInt(params.get('delay') || '0', 10);

        if (delay > 0) {
            const timer = setTimeout(() => {
                navigate(to);
            }, delay);
            return () => clearTimeout(timer);
        } else {
            navigate(to);
        }
    }, [navigate, location]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Yönlendiriliyor...
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Lütfen bekleyin
                </p>
            </div>
        </div>
    );
};

export default Redirect; 