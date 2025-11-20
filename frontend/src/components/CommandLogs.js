import React, { useState, useEffect } from 'react';
import { commandLogService } from '../services/commandLogService';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CommandLogs = ({ sessionId, userId, assetId }) => {
    const [commands, setCommands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)));
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        fetchCommands();
    }, [sessionId, userId, assetId, startDate, endDate]);

    const fetchCommands = async () => {
        try {
            setLoading(true);
            let data;
            if (sessionId) {
                data = await commandLogService.getSessionCommandsByDateRange(
                    sessionId,
                    startDate.toISOString(),
                    endDate.toISOString()
                );
            } else if (userId) {
                data = await commandLogService.getUserCommandsByDateRange(
                    userId,
                    startDate.toISOString(),
                    endDate.toISOString()
                );
            } else if (assetId) {
                data = await commandLogService.getAssetCommandsByDateRange(
                    assetId,
                    startDate.toISOString(),
                    endDate.toISOString()
                );
            }
            setCommands(data);
        } catch (err) {
            setError('Komut logları yüklenirken bir hata oluştu');
            console.error('Komut log yükleme hatası:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Komut Logları</h2>
                <div className="flex space-x-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Başlangıç</label>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bitiş</label>
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Komut</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Çıktı</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Çalışma Dizini</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Çıkış Kodu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {commands.map((command) => (
                            <tr key={command.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {format(new Date(command.timestamp), 'dd MMMM yyyy HH:mm', { locale: tr })}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                    {command.command}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                    <pre className="whitespace-pre-wrap">{command.output}</pre>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {command.workingDirectory}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {command.exitCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        command.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                                        command.status === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {command.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CommandLogs; 