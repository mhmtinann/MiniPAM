package com.example.minipam.repository;

import com.example.minipam.model.FileTransferLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileTransferLogRepository extends JpaRepository<FileTransferLog, Long> {
} 