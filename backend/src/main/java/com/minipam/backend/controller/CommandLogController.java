package com.minipam.backend.controller;

import com.minipam.backend.model.CommandLog;
import com.minipam.backend.service.CommandLogService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/commands")
@CrossOrigin(origins = "http://localhost:3000")
public class CommandLogController {
    private final CommandLogService commandLogService;

    public CommandLogController(CommandLogService commandLogService) {
        this.commandLogService = commandLogService;
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<CommandLog>> getSessionCommands(@PathVariable Long sessionId) {
        return ResponseEntity.ok(commandLogService.getSessionCommands(sessionId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<CommandLog>> getCommandsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(commandLogService.getCommandsByStatus(status));
    }

    @GetMapping("/session/{sessionId}/date-range")
    public ResponseEntity<List<CommandLog>> getSessionCommandsByDateRange(
            @PathVariable Long sessionId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(commandLogService.getSessionCommandsByDateRange(sessionId, start, end));
    }

    @GetMapping("/user/{userId}/date-range")
    public ResponseEntity<List<CommandLog>> getUserCommandsByDateRange(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(commandLogService.getUserCommandsByDateRange(userId, start, end));
    }

    @GetMapping("/asset/{assetId}/date-range")
    public ResponseEntity<List<CommandLog>> getAssetCommandsByDateRange(
            @PathVariable Long assetId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(commandLogService.getAssetCommandsByDateRange(assetId, start, end));
    }
} 