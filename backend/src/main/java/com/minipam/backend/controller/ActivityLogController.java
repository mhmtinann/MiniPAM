package com.minipam.backend.controller;

import com.minipam.backend.model.ActivityLog;
import com.minipam.backend.service.ActivityLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityLogController {
    private final ActivityLogService activityLogService;

    public ActivityLogController(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @GetMapping
    public ResponseEntity<List<ActivityLog>> getAllLogs() {
        return ResponseEntity.ok(activityLogService.getAllLogs());
    }

    @GetMapping("/asset/{assetId}")
    public ResponseEntity<List<ActivityLog>> getAssetLogs(@PathVariable Long assetId) {
        return ResponseEntity.ok(activityLogService.getAssetLogs(assetId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ActivityLog>> getUserLogs(@PathVariable Long userId) {
        return ResponseEntity.ok(activityLogService.getUserLogs(userId));
    }
} 