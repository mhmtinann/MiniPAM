import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('verifying');
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');

            if (!token) {
                setStatus('error');
                setError('Doğrulama token\'ı bulunamadı');
                return;
            }

            try {
                await axios.post('http://localhost:8080/api/auth/verify', { token });
                setStatus('success');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (err) {
                setStatus('error');
                setError('Doğrulama işlemi başarısız oldu');
                console.error('Doğrulama hatası:', err);
            }
        };

        verifyToken();
    }, [navigate, location]);

    const renderContent = () => {
        switch (status) {
            case 'verifying':
                return (
                    <>
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Doğrulanıyor...
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Lütfen bekleyin
                        </p>
                    </>
                );
            case 'success':
                return (
                    <>
                        <div className="flex justify-center">
                            <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Doğrulama Başarılı
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Hesabınız başarıyla doğrulandı. Giriş sayfasına yönlendiriliyorsunuz...
                        </p>
                    </>
                );
            case 'error':
                return (
                    <>
                        <div className="flex justify-center">
                            <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Doğrulama Başarısız
                        </h2>
                        <p className="mt-2 text-center text-sm text-red-600">
                            {error}
                        </p>
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Giriş Sayfasına Dön
                            </button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {renderContent()}
            </div>
        </div>
    );
};

export default Verify; 