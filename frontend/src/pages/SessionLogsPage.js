import React from 'react';
import { useParams } from 'react-router-dom';
import SessionLogs from '../components/SessionLogs';

const SessionLogsPage = () => {
    const { userId, assetId } = useParams();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">
                {userId ? 'Kullanıcı Oturum Logları' :
                 assetId ? 'Sunucu Oturum Logları' :
                 'Tüm Oturum Logları'}
            </h1>
            <SessionLogs userId={userId} assetId={assetId} />
        </div>
    );
};

export default SessionLogsPage; 