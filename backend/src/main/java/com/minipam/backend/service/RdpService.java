package com.minipam.backend.service;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RdpService {
    private static final Logger logger = LoggerFactory.getLogger(RdpService.class);
    private final Map<String, Process> activeConnections = new ConcurrentHashMap<>();

    public boolean connect(String assetId, Map<String, Object> credentials) {
        try {
            String hostname = (String) credentials.get("ipAddress");
            String username = (String) credentials.get("username");
            String password = (String) credentials.get("password");
            Integer port = (Integer) credentials.getOrDefault("port", 3389);

            // RDP bağlantı dosyası oluştur
            String rdpFile = createRdpFile(hostname, port, username);
            
            // mstsc.exe ile bağlantıyı başlat
            Process process = Runtime.getRuntime().exec(new String[]{
                "mstsc.exe",
                rdpFile
            });

            activeConnections.put(assetId, process);
            logger.info("RDP connection initiated for asset: {}", assetId);
            return true;
        } catch (Exception e) {
            logger.error("Error initiating RDP connection", e);
            return false;
        }
    }

    private String createRdpFile(String hostname, int port, String username) throws IOException {
        String tempDir = System.getProperty("java.io.tmpdir");
        String rdpFile = tempDir + File.separator + "connection.rdp";
        
        StringBuilder content = new StringBuilder();
        content.append("full address:s:").append(hostname).append(":").append(port).append("\n");
        content.append("username:s:").append(username).append("\n");
        content.append("screen mode id:i:2\n");
        content.append("use multimon:i:0\n");
        content.append("desktopwidth:i:1920\n");
        content.append("desktopheight:i:1080\n");
        content.append("session bpp:i:32\n");
        content.append("winposstr:s:0,1,0,0,800,600\n");
        content.append("compression:i:1\n");
        content.append("keyboardhook:i:2\n");
        content.append("audiocapturemode:i:0\n");
        content.append("videoplaybackmode:i:1\n");
        content.append("connection type:i:7\n");
        content.append("networkautodetect:i:1\n");
        content.append("bandwidthautodetect:i:1\n");
        content.append("displayconnectionbar:i:1\n");
        content.append("enableworkspacereconnect:i:0\n");
        content.append("disable wallpaper:i:0\n");
        content.append("allow font smoothing:i:1\n");
        content.append("allow desktop composition:i:1\n");
        content.append("disable full window drag:i:0\n");
        content.append("disable menu anims:i:0\n");
        content.append("disable themes:i:0\n");
        content.append("disable cursor setting:i:0\n");
        content.append("bitmapcachepersistenable:i:1\n");
        content.append("audiomode:i:0\n");
        content.append("redirectprinters:i:1\n");
        content.append("redirectcomports:i:0\n");
        content.append("redirectsmartcards:i:1\n");
        content.append("redirectclipboard:i:1\n");
        content.append("redirectposdevices:i:0\n");
        content.append("autoreconnection enabled:i:1\n");
        content.append("authentication level:i:2\n");
        content.append("prompt for credentials:i:0\n");
        content.append("negotiate security layer:i:1\n");
        content.append("remoteapplicationmode:i:0\n");
        content.append("alternate shell:s:\n");
        content.append("shell working directory:s:\n");
        content.append("gatewayhostname:s:\n");
        content.append("gatewayusagemethod:i:4\n");
        content.append("gatewaycredentialssource:i:4\n");
        content.append("gatewayprofileusagemethod:i:0\n");
        content.append("promptcredentialonce:i:0\n");
        content.append("use redirection server name:i:0\n");
        content.append("rdgiskdcproxy:i:0\n");
        content.append("kdcproxyname:s:\n");

        java.nio.file.Files.writeString(new File(rdpFile).toPath(), content.toString());
        return rdpFile;
    }

    public void disconnect(String assetId) {
        Process process = activeConnections.remove(assetId);
        if (process != null) {
            try {
                process.destroy();
                logger.info("RDP connection closed for asset: {}", assetId);
            } catch (Exception e) {
                logger.error("Error closing RDP connection", e);
            }
        }
    }

    public boolean isConnected(String assetId) {
        Process process = activeConnections.get(assetId);
        return process != null && process.isAlive();
    }
} 