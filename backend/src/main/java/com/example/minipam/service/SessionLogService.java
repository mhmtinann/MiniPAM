package com.example.minipam.service;

import com.example.minipam.model.SessionLog;
import com.example.minipam.repository.SessionLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionLogService {
    private final SessionLogRepository sessionLogRepository;

    public SessionLogService(SessionLogRepository sessionLogRepository) {
        this.sessionLogRepository = sessionLogRepository;
    }

    public SessionLog save(SessionLog log) {
        return sessionLogRepository.save(log);
    }

    public List<SessionLog> getAllLogs() {
        return sessionLogRepository.findAll();
    }
} 