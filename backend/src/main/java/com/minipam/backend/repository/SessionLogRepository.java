package com.minipam.backend.repository;

import com.minipam.backend.model.SessionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SessionLogRepository extends JpaRepository<SessionLog, Long> {
    Optional<SessionLog> findBySessionId(String sessionId);
    List<SessionLog> findByUserIdOrderByStartTimeDesc(Long userId);
    List<SessionLog> findByAssetIdOrderByStartTimeDesc(Long assetId);
    List<SessionLog> findByStatus(String status);
    
    @Query("SELECT s FROM SessionLog s WHERE s.startTime BETWEEN ?1 AND ?2")
    List<SessionLog> findByDateRange(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT s FROM SessionLog s WHERE s.user.id = ?1 AND s.startTime BETWEEN ?2 AND ?3")
    List<SessionLog> findByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT s FROM SessionLog s WHERE s.asset.id = ?1 AND s.startTime BETWEEN ?2 AND ?3")
    List<SessionLog> findByAssetAndDateRange(Long assetId, LocalDateTime start, LocalDateTime end);
} 