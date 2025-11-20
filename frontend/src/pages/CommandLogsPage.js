import React from 'react';
import { useParams } from 'react-router-dom';
import CommandLogs from '../components/CommandLogs';

const CommandLogsPage = () => {
    const { sessionId, userId, assetId } = useParams();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">
                {sessionId ? 'Oturum Komut Logları' :
                 userId ? 'Kullanıcı Komut Logları' :
                 assetId ? 'Sunucu Komut Logları' :
                 'Tüm Komut Logları'}
            </h1>
            <CommandLogs sessionId={sessionId} userId={userId} assetId={assetId} />
        </div>
    );
};

export default CommandLogsPage; 