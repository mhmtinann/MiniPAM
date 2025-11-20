import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileTransferLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/logs/file-transfers')
      .then(res => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Loglar alınamadı');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Dosya Transfer Logları</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı</th>
            <th>Sunucu</th>
            <th>Oturum ID</th>
            <th>Dosya Adı</th>
            <th>Boyut (byte)</th>
            <th>Yön</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.username}</td>
              <td>{log.asset}</td>
              <td>{log.sessionId}</td>
              <td>{log.fileName}</td>
              <td>{log.fileSize}</td>
              <td>{log.direction}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTransferLogs; 