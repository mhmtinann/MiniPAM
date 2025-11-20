import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SessionLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/logs/sessions')
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
      <h2>Oturum (Session) Logları</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı</th>
            <th>Sunucu</th>
            <th>Protokol</th>
            <th>Başlangıç</th>
            <th>Bitiş</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.username}</td>
              <td>{log.asset}</td>
              <td>{log.protocol}</td>
              <td>{log.startTime}</td>
              <td>{log.endTime}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionLogs; 