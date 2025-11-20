package com.example.minipam.controller;

import com.example.minipam.model.AuditLog;
import com.example.minipam.model.SessionLog;
import com.example.minipam.model.CommandLog;
import com.example.minipam.model.FileTransferLog;
import com.example.minipam.service.AuditLogService;
import com.example.minipam.service.SessionLogService;
import com.example.minipam.service.CommandLogService;
import com.example.minipam.service.FileTransferLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "*")
public class LogController {
    private final AuditLogService auditLogService;
    private final SessionLogService sessionLogService;
    private final CommandLogService commandLogService;
    private final FileTransferLogService fileTransferLogService;

    public LogController(AuditLogService auditLogService, SessionLogService sessionLogService, CommandLogService commandLogService, FileTransferLogService fileTransferLogService) {
        this.auditLogService = auditLogService;
        this.sessionLogService = sessionLogService;
        this.commandLogService = commandLogService;
        this.fileTransferLogService = fileTransferLogService;
    }

    // AUDIT LOGS
    @GetMapping("/audit")
    public List<AuditLog> getAuditLogs() {
        return auditLogService.getAllLogs();
    }

    // SESSION LOGS
    @GetMapping("/sessions")
    public List<SessionLog> getSessionLogs() {
        return sessionLogService.getAllLogs();
    }

    // COMMAND LOGS
    @GetMapping("/commands")
    public List<CommandLog> getCommandLogs() {
        return commandLogService.getAllLogs();
    }

    // FILE TRANSFER LOGS
    @GetMapping("/file-transfers")
    public List<FileTransferLog> getFileTransferLogs() {
        return fileTransferLogService.getAllLogs();
    }
} 