package com.minipam.backend.controller;

import com.minipam.backend.model.SessionLog;
import com.minipam.backend.service.SessionLogService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:3000")
public class SessionLogController {
    private final SessionLogService sessionLogService;

    public SessionLogController(SessionLogService sessionLogService) {
        this.sessionLogService = sessionLogService;
    }

    @GetMapping("/active")
    public ResponseEntity<List<SessionLog>> getActiveSessions() {
        return ResponseEntity.ok(sessionLogService.getActiveSessions());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SessionLog>> getUserSessions(@PathVariable Long userId) {
        return ResponseEntity.ok(sessionLogService.getUserSessions(userId));
    }

    @GetMapping("/asset/{assetId}")
    public ResponseEntity<List<SessionLog>> getAssetSessions(@PathVariable Long assetId) {
        return ResponseEntity.ok(sessionLogService.getAssetSessions(assetId));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<SessionLog>> getSessionsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(sessionLogService.getSessionsByDateRange(start, end));
    }

    @GetMapping("/user/{userId}/date-range")
    public ResponseEntity<List<SessionLog>> getUserSessionsByDateRange(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(sessionLogService.getUserSessionsByDateRange(userId, start, end));
    }

    @GetMapping("/asset/{assetId}/date-range")
    public ResponseEntity<List<SessionLog>> getAssetSessionsByDateRange(
            @PathVariable Long assetId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(sessionLogService.getAssetSessionsByDateRange(assetId, start, end));
    }
} 