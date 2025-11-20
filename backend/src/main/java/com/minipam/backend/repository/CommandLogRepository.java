package com.minipam.backend.repository;

import com.minipam.backend.model.CommandLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface CommandLogRepository extends JpaRepository<CommandLog, Long> {
    List<CommandLog> findBySessionIdOrderByTimestampDesc(Long sessionId);
    List<CommandLog> findByStatus(String status);
    
    @Query("SELECT c FROM CommandLog c WHERE c.session.id = ?1 AND c.timestamp BETWEEN ?2 AND ?3")
    List<CommandLog> findBySessionAndDateRange(Long sessionId, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT c FROM CommandLog c WHERE c.session.user.id = ?1 AND c.timestamp BETWEEN ?2 AND ?3")
    List<CommandLog> findByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT c FROM CommandLog c WHERE c.session.asset.id = ?1 AND c.timestamp BETWEEN ?2 AND ?3")
    List<CommandLog> findByAssetAndDateRange(Long assetId, LocalDateTime start, LocalDateTime end);
} 