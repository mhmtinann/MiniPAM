package com.minipam.backend.service;

import com.minipam.backend.model.ActivityLog;
import com.minipam.backend.model.Asset;
import com.minipam.backend.model.User;
import com.minipam.backend.repository.ActivityLogRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityLogService {
    private final ActivityLogRepository activityLogRepository;

    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    public ActivityLog logActivity(Asset asset, User user, String action, String details, String status) {
        ActivityLog log = new ActivityLog();
        log.setAsset(asset);
        log.setUser(user);
        log.setAction(action);
        log.setDetails(details);
        log.setTimestamp(LocalDateTime.now());
        log.setStatus(status);
        return activityLogRepository.save(log);
    }

    public List<ActivityLog> getAssetLogs(Long assetId) {
        return activityLogRepository.findByAssetIdOrderByTimestampDesc(assetId);
    }

    public List<ActivityLog> getUserLogs(Long userId) {
        return activityLogRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public List<ActivityLog> getAllLogs() {
        return activityLogRepository.findAllByOrderByTimestampDesc();
    }
} 