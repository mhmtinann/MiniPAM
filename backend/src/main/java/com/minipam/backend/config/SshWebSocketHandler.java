package com.minipam.backend.config;

import com.jcraft.jsch.*;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.charset.StandardCharsets;

@Component
public class SshWebSocketHandler extends TextWebSocketHandler {
    private Session sshSession;
    private ChannelShell channel;
    private OutputStream sshInput;
    private Thread sshOutputThread;

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) {
        // Bağlantı kurulduğunda ilk mesajda SSH bilgilerini bekleyeceğiz
    }

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) throws Exception {
        // İlk mesajda SSH bilgileri (ör: "ip;port;username;password") beklenir, sonrakiler terminal girdisi olarak işlenir
        if (sshSession == null || !sshSession.isConnected()) {
            // SSH bağlantı bilgilerini al
            String payload = message.getPayload();
            String[] parts = payload.split(";");
            if (parts.length < 4) {
                session.sendMessage(new TextMessage("SSH bilgileri eksik!"));
                return;
            }
            String ip = parts[0];
            int port = Integer.parseInt(parts[1]);
            String username = parts[2];
            String password = parts[3];

            JSch jsch = new JSch();
            sshSession = jsch.getSession(username, ip, port);
            sshSession.setPassword(password);
            sshSession.setConfig("StrictHostKeyChecking", "no");
            sshSession.connect(5000);

            channel = (ChannelShell) sshSession.openChannel("shell");
            sshInput = channel.getOutputStream();
            InputStream sshOutput = channel.getInputStream();
            channel.connect(3000);

            // SSH'dan gelen çıktıyı WebSocket ile frontend'e aktar
            sshOutputThread = new Thread(() -> {
                try {
                    byte[] buffer = new byte[1024];
                    int len;
                    while ((len = sshOutput.read(buffer)) != -1) {
                        if (session.isOpen()) {
                            session.sendMessage(new TextMessage(new String(buffer, 0, len, StandardCharsets.UTF_8)));
                        } else {
                            break;
                        }
                    }
                } catch (Exception ignored) {}
            });
            sshOutputThread.start();
        } else {
            // Sonraki mesajlar: terminal girdisi
            sshInput.write(message.getPayload().getBytes(StandardCharsets.UTF_8));
            sshInput.flush();
        }
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {
        try {
            if (channel != null && channel.isConnected()) channel.disconnect();
            if (sshSession != null && sshSession.isConnected()) sshSession.disconnect();
            if (sshOutputThread != null && sshOutputThread.isAlive()) sshOutputThread.interrupt();
        } catch (Exception ignored) {}
    }
}