import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    403 - Erişim Engellendi
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Bu sayfaya erişim izniniz bulunmamaktadır.
                </p>
                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden; 