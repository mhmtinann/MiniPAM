package com.minipam.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minipam.backend.service.RdpService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RdpWebSocketHandler extends TextWebSocketHandler {
    private static final Logger logger = LoggerFactory.getLogger(RdpWebSocketHandler.class);
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RdpService rdpService;

    public RdpWebSocketHandler(RdpService rdpService) {
        this.rdpService = rdpService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        try {
            String assetId = extractAssetId(session);
            if (assetId != null) {
                sessions.put(assetId, session);
                logger.info("RDP WebSocket connection established for asset: {}", assetId);
            }
        } catch (Exception e) {
            logger.error("Error establishing RDP WebSocket connection", e);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        try {
            String assetId = extractAssetId(session);
            if (assetId == null) {
                logger.error("Asset ID not found in session");
                return;
            }

            Map<String, Object> payload = objectMapper.readValue(message.getPayload(), Map.class);
            if ("connect".equals(payload.get("type"))) {
                handleRdpConnection(session, assetId, (Map<String, Object>) payload.get("credentials"));
            }
        } catch (Exception e) {
            logger.error("Error handling RDP WebSocket message", e);
            sendErrorMessage(session, "Error processing message: " + e.getMessage());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        try {
            String assetId = extractAssetId(session);
            if (assetId != null) {
                sessions.remove(assetId);
                rdpService.disconnect(assetId);
                logger.info("RDP WebSocket connection closed for asset: {}", assetId);
            }
        } catch (Exception e) {
            logger.error("Error closing RDP WebSocket connection", e);
        }
    }

    private String extractAssetId(WebSocketSession session) {
        if (session == null || session.getUri() == null) {
            logger.error("Invalid WebSocket session or URI");
            return null;
        }
        String path = session.getUri().getPath();
        if (path == null || !path.contains("/")) {
            logger.error("Invalid WebSocket path: {}", path);
            return null;
        }
        return path.substring(path.lastIndexOf('/') + 1);
    }

    private void handleRdpConnection(WebSocketSession session, String assetId, Map<String, Object> credentials) {
        try {
            if (rdpService.connect(assetId, credentials)) {
                sendSuccessMessage(session, "RDP bağlantısı başarıyla başlatıldı");
            } else {
                sendErrorMessage(session, "RDP bağlantısı başlatılamadı");
            }
        } catch (Exception e) {
            logger.error("Error establishing RDP connection", e);
            sendErrorMessage(session, "RDP bağlantısı kurulamadı: " + e.getMessage());
        }
    }

    private void sendSuccessMessage(WebSocketSession session, String message) throws IOException {
        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(Map.of(
            "type", "connected",
            "message", message
        ))));
    }

    private void sendErrorMessage(WebSocketSession session, String message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(Map.of(
                "type", "error",
                "message", message
            ))));
        } catch (IOException e) {
            logger.error("Error sending error message to client", e);
        }
    }
} 