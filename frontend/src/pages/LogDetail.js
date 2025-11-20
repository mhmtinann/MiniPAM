import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogDetail = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [log, setLog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLog();
    }, [type, id]);

    const fetchLog = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/logs/${type}/${id}`);
            setLog(response.data);
        } catch (err) {
            setError('Log detayları yüklenirken bir hata oluştu');
            console.error('Log detay yükleme hatası:', err);
        } finally {
            setLoading(false);
        }
    };

    const getLogTypeTitle = () => {
        switch (type) {
            case 'sessions':
                return 'Oturum Log Detayı';
            case 'commands':
                return 'Komut Log Detayı';
            case 'file-transfers':
                return 'Dosya Transfer Log Detayı';
            default:
                return 'Log Detayı';
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!log) return <div>Log bulunamadı</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{getLogTypeTitle()}</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                >
                    Geri Dön
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Genel Bilgiler</h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Tarih</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {new Date(log.timestamp).toLocaleString('tr-TR')}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Kullanıcı</dt>
                                <dd className="mt-1 text-sm text-gray-900">{log.username}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Sunucu</dt>
                                <dd className="mt-1 text-sm text-gray-900">{log.hostname}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Durum</dt>
                                <dd className="mt-1">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        log.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {log.status}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">İşlem Detayları</h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">İşlem</dt>
                                <dd className="mt-1 text-sm text-gray-900">{log.action}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Protokol</dt>
                                <dd className="mt-1 text-sm text-gray-900">{log.protocol}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">IP Adresi</dt>
                                <dd className="mt-1 text-sm text-gray-900">{log.ipAddress}</dd>
                            </div>
                            {log.errorMessage && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Hata Mesajı</dt>
                                    <dd className="mt-1 text-sm text-red-600">{log.errorMessage}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>

                {type === 'commands' && log.commands && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Komut Geçmişi</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                                {log.commands.join('\n')}
                            </pre>
                        </div>
                    </div>
                )}

                {type === 'file-transfers' && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Dosya Transfer Bilgileri</h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Dosya Adı</dt>
                                <dd className="mt-1 text-sm text-gray-900">{log.fileName}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Dosya Boyutu</dt>
                                <dd className="mt-1 text-sm text-gray-900">{log.fileSize} bytes</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Transfer Yönü</dt>
                                <dd className="mt-1 text-sm text-gray-900">{log.direction}</dd>
                            </div>
                        </dl>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogDetail; 