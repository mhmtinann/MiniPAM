import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAsset();
    }, [id]);

    const fetchAsset = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/assets/${id}`);
            setAsset(response.data);
        } catch (err) {
            setError('Sunucu detayları yüklenirken bir hata oluştu');
            console.error('Sunucu detay yükleme hatası:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Bu sunucuyu silmek istediğinizden emin misiniz?')) {
            try {
                await axios.delete(`http://localhost:8080/api/assets/${id}`);
                navigate('/assets');
            } catch (err) {
                setError('Sunucu silinirken bir hata oluştu');
                console.error('Sunucu silme hatası:', err);
            }
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!asset) return <div>Sunucu bulunamadı</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{asset.hostname}</h1>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate(`/logs/sessions/asset/${id}`)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                        Oturum Logları
                    </button>
                    <button
                        onClick={() => navigate(`/logs/commands/asset/${id}`)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                        Komut Logları
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                    >
                        Sunucuyu Sil
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Sunucu Bilgileri</h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">IP Adresi</dt>
                                <dd className="mt-1 text-sm text-gray-900">{asset.ipAddress}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">İşletim Sistemi</dt>
                                <dd className="mt-1 text-sm text-gray-900">{asset.osType}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Durum</dt>
                                <dd className="mt-1">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        asset.status === 'ONLINE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {asset.status}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Bağlantı Bilgileri</h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">SSH Port</dt>
                                <dd className="mt-1 text-sm text-gray-900">{asset.sshPort || '22'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">RDP Port</dt>
                                <dd className="mt-1 text-sm text-gray-900">{asset.rdpPort || '3389'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetDetail; 