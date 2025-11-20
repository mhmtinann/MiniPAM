package com.example.minipam.service;

import com.example.minipam.model.CommandLog;
import com.example.minipam.repository.CommandLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandLogService {
    private final CommandLogRepository commandLogRepository;

    public CommandLogService(CommandLogRepository commandLogRepository) {
        this.commandLogRepository = commandLogRepository;
    }

    public CommandLog save(CommandLog log) {
        return commandLogRepository.save(log);
    }

    public List<CommandLog> getAllLogs() {
        return commandLogRepository.findAll();
    }
} 