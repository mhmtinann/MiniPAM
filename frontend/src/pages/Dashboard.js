import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import GroupIcon from '@mui/icons-material/Group';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import axios from 'axios';

const COLORS = ['#4fd1c5', '#63b3ed', '#f6ad55'];

const Dashboard = () => {
  const [assetCount, setAssetCount] = useState(0);
  const [accountCount, setAccountCount] = useState(0);
  const [assetTypeDistribution, setAssetTypeDistribution] = useState([]);
  const [dailySessions, setDailySessions] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchData = async () => {
      try {
        const assetRes = await axios.get('http://localhost:8080/api/assets');
        const userRes = await axios.get('http://localhost:8080/api/users');

        const assets = assetRes.data || [];
        setAssetCount(assets.length);
        setAccountCount(userRes.data?.length || 0);

        const typeDist = { windows: 0, linux: 0, unknown: 0 };
        assets.forEach(asset => {
          const lower = asset.name.toLowerCase();
          if (lower.includes('windows')) typeDist.windows++;
          else if (lower.includes('linux')) typeDist.linux++;
          else typeDist.unknown++;
        });

        setAssetTypeDistribution([
          { name: 'Windows', value: typeDist.windows },
          { name: 'Linux', value: typeDist.linux },
          { name: 'Unknown', value: typeDist.unknown },
        ]);

        const now = new Date();
        const sessionData = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(now);
          d.setDate(d.getDate() - (6 - i));
          return {
            date: d.toISOString().split('T')[0],
            count: Math.floor(Math.random() * 10),
          };
        });

        setDailySessions(sessionData);
      } catch (err) {
        console.error('Dashboard verisi alınamadı:', err);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { label: 'Toplam Sunucu', value: assetCount, icon: <StorageIcon fontSize="large" sx={{ color: COLORS[0] }} /> },
    { label: 'Toplam Hesap', value: accountCount, icon: <GroupIcon fontSize="large" sx={{ color: COLORS[1] }} /> },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Paper sx={{ p: 3, background: '#262a3b', color: '#fff', display: 'flex', alignItems: 'center', gap: 2 }}>
              {stat.icon}
              <Box>
                <Typography variant="h5">{stat.value}</Typography>
                <Typography variant="body2">{stat.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, background: '#262a3b', height: 300 }}>
            <Typography variant="subtitle1" color="#fff" gutterBottom>
              Sunucu Tür Dağılımı
            </Typography>
            {isClient && (
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={assetTypeDistribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {assetTypeDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, background: '#262a3b', height: 300 }}>
            <Typography variant="subtitle1" color="#fff" gutterBottom>
              Günlük Yeni Oturum Sayısı
            </Typography>
            {isClient && (
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={dailySessions}>
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#f6ad55" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, background: '#262a3b', height: 300 }}>
            <Typography variant="subtitle1" color="#fff" gutterBottom>
              Sunucu Türlerine Göre Sayı
            </Typography>
            {isClient && (
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={assetTypeDistribution}>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
