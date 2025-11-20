package com.example.minipam.repository;

import com.example.minipam.model.CommandLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandLogRepository extends JpaRepository<CommandLog, Long> {
} 