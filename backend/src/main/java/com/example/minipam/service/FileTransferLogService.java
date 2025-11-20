package com.example.minipam.service;

import com.example.minipam.model.FileTransferLog;
import com.example.minipam.repository.FileTransferLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileTransferLogService {
    private final FileTransferLogRepository fileTransferLogRepository;

    public FileTransferLogService(FileTransferLogRepository fileTransferLogRepository) {
        this.fileTransferLogRepository = fileTransferLogRepository;
    }

    public FileTransferLog save(FileTransferLog log) {
        return fileTransferLogRepository.save(log);
    }

    public List<FileTransferLog> getAllLogs() {
        return fileTransferLogRepository.findAll();
    }
} 