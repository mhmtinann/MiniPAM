package com.minipam.backend.service;

import com.minipam.backend.model.SessionLog;
import com.minipam.backend.model.User;
import com.minipam.backend.model.Asset;
import com.minipam.backend.repository.SessionLogRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SessionLogService {
    private final SessionLogRepository sessionLogRepository;

    public SessionLogService(SessionLogRepository sessionLogRepository) {
        this.sessionLogRepository = sessionLogRepository;
    }

    public SessionLog startSession(User user, Asset asset, String connectionType, String clientIp) {
        SessionLog session = new SessionLog();
        session.setUser(user);
        session.setAsset(asset);
        session.setConnectionType(connectionType);
        session.setClientIp(clientIp);
        session.setStartTime(LocalDateTime.now());
        session.setStatus("ACTIVE");
        session.setSessionId(UUID.randomUUID().toString());
        return sessionLogRepository.save(session);
    }

    public SessionLog endSession(String sessionId) {
        SessionLog session = sessionLogRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        session.setEndTime(LocalDateTime.now());
        session.setStatus("COMPLETED");
        return sessionLogRepository.save(session);
    }

    public List<SessionLog> getActiveSessions() {
        return sessionLogRepository.findByStatus("ACTIVE");
    }

    public List<SessionLog> getUserSessions(Long userId) {
        return sessionLogRepository.findByUserIdOrderByStartTimeDesc(userId);
    }

    public List<SessionLog> getAssetSessions(Long assetId) {
        return sessionLogRepository.findByAssetIdOrderByStartTimeDesc(assetId);
    }

    public List<SessionLog> getSessionsByDateRange(LocalDateTime start, LocalDateTime end) {
        return sessionLogRepository.findByDateRange(start, end);
    }

    public List<SessionLog> getUserSessionsByDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        return sessionLogRepository.findByUserAndDateRange(userId, start, end);
    }

    public List<SessionLog> getAssetSessionsByDateRange(Long assetId, LocalDateTime start, LocalDateTime end) {
        return sessionLogRepository.findByAssetAndDateRange(assetId, start, end);
    }
} 