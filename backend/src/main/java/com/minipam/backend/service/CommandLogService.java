package com.minipam.backend.service;

import com.minipam.backend.model.CommandLog;
import com.minipam.backend.model.SessionLog;
import com.minipam.backend.repository.CommandLogRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommandLogService {
    private final CommandLogRepository commandLogRepository;

    public CommandLogService(CommandLogRepository commandLogRepository) {
        this.commandLogRepository = commandLogRepository;
    }

    public CommandLog logCommand(SessionLog session, String command, String output, String status, String workingDirectory, String exitCode) {
        CommandLog commandLog = new CommandLog();
        commandLog.setSession(session);
        commandLog.setCommand(command);
        commandLog.setOutput(output);
        commandLog.setStatus(status);
        commandLog.setTimestamp(LocalDateTime.now());
        commandLog.setWorkingDirectory(workingDirectory);
        commandLog.setExitCode(exitCode);
        return commandLogRepository.save(commandLog);
    }

    public List<CommandLog> getSessionCommands(Long sessionId) {
        return commandLogRepository.findBySessionIdOrderByTimestampDesc(sessionId);
    }

    public List<CommandLog> getCommandsByStatus(String status) {
        return commandLogRepository.findByStatus(status);
    }

    public List<CommandLog> getSessionCommandsByDateRange(Long sessionId, LocalDateTime start, LocalDateTime end) {
        return commandLogRepository.findBySessionAndDateRange(sessionId, start, end);
    }

    public List<CommandLog> getUserCommandsByDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        return commandLogRepository.findByUserAndDateRange(userId, start, end);
    }

    public List<CommandLog> getAssetCommandsByDateRange(Long assetId, LocalDateTime start, LocalDateTime end) {
        return commandLogRepository.findByAssetAndDateRange(assetId, start, end);
    }
} 