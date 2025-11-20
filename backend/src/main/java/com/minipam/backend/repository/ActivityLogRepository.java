package com.minipam.backend.repository;

import com.minipam.backend.model.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findByAssetIdOrderByTimestampDesc(Long assetId);
    List<ActivityLog> findByUserIdOrderByTimestampDesc(Long userId);
    List<ActivityLog> findAllByOrderByTimestampDesc();
} 