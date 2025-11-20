import React, { useState, useEffect } from 'react';
import assetService from '../services/assetService';
import ActivityLogs from './ActivityLogs';

const Assets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [newAsset, setNewAsset] = useState({ hostname: '', ipAddress: '' });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            const data = await assetService.getAllAssets();
            setAssets(data);
        } catch (err) {
            setError('Sunucular yüklenirken bir hata oluştu');
            console.error('Sunucu yükleme hatası:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await assetService.createAsset(newAsset);
            setNewAsset({ hostname: '', ipAddress: '' });
            setShowForm(false);
            await fetchAssets(); // Sunucuları yeniden yükle
        } catch (err) {
            setError('Sunucu oluşturulurken bir hata oluştu');
            console.error('Sunucu oluşturma hatası:', err);
        }
    };

    const handleUpdate = async (id, asset) => {
        try {
            await assetService.updateAsset(id, asset);
            await fetchAssets();
        } catch (err) {
            setError('Sunucu güncellenirken bir hata oluştu');
            console.error('Sunucu güncelleme hatası:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await assetService.deleteAsset(id);
            await fetchAssets();
        } catch (err) {
            setError('Sunucu silinirken bir hata oluştu');
            console.error('Sunucu silme hatası:', err);
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Sunucular</h2>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {showForm ? 'İptal' : 'Yeni Sunucu Ekle'}
                        </button>
                    </div>

                    {showForm && (
                        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <form onSubmit={handleCreate}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Sunucu Adı
                                    </label>
                                    <input
                                        type="text"
                                        value={newAsset.hostname}
                                        onChange={(e) => setNewAsset({ ...newAsset, hostname: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        IP Adresi
                                    </label>
                                    <input
                                        type="text"
                                        value={newAsset.ipAddress}
                                        onChange={(e) => setNewAsset({ ...newAsset, ipAddress: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Ekle
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sunucu Adı</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Adresi</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {assets.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedAsset(asset)}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.hostname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.ipAddress}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(asset.id);
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    {selectedAsset ? (
                        <ActivityLogs assetId={selectedAsset.id} />
                    ) : (
                        <ActivityLogs />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assets; 