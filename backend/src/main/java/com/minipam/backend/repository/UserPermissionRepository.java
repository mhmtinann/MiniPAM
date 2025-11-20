package com.minipam.backend.repository;

import com.minipam.backend.model.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface UserPermissionRepository extends JpaRepository<UserPermission, Long> {
    List<UserPermission> findByUserId(Long userId);
    List<UserPermission> findByUserIdAndAssetId(Long userId, Long assetId);
    
    @Modifying
    @Query("DELETE FROM UserPermission up WHERE up.user.id = ?1")
    void deleteByUserId(Long userId);
    
    void deleteByUserIdAndAssetId(Long userId, Long assetId);
} 