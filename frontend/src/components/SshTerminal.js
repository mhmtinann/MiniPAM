import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export default function SshTerminal({ wsUrl, sshInfo }) {
  const terminalRef = useRef();

  useEffect(() => {
    const term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      ws.send(`${sshInfo.ip};${sshInfo.port};${sshInfo.username};${sshInfo.password}`);
    };

    term.onData(data => ws.send(data));
    ws.onmessage = e => term.write(e.data);

    // Responsive: fit terminal on window resize
    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      ws.close();
      term.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [wsUrl, sshInfo]);

  return (
    <div
      ref={terminalRef}
      style={{
        width: '100%',
        height: '400px',
        minHeight: 300,
        background: 'black',
      }}
    />
  );
}