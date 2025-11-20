import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/${id}`);
            setUser(response.data);
        } catch (err) {
            setError('Kullanıcı detayları yüklenirken bir hata oluştu');
            console.error('Kullanıcı detay yükleme hatası:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
            try {
                await axios.delete(`http://localhost:8080/api/users/${id}`);
                navigate('/users');
            } catch (err) {
                setError('Kullanıcı silinirken bir hata oluştu');
                console.error('Kullanıcı silme hatası:', err);
            }
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div>Kullanıcı bulunamadı</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate(`/logs/sessions/user/${id}`)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                        Oturum Logları
                    </button>
                    <button
                        onClick={() => navigate(`/logs/commands/user/${id}`)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                        Komut Logları
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                    >
                        Kullanıcıyı Sil
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Kullanıcı Bilgileri</h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">E-posta</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Rol</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.role}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Durum</dt>
                                <dd className="mt-1">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {user.active ? 'AKTİF' : 'PASİF'}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Erişim Bilgileri</h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Son Giriş</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString('tr-TR') : 'Hiç giriş yapmadı'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Erişim İzinleri</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user.permissions?.join(', ') || 'İzin yok'}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail; 