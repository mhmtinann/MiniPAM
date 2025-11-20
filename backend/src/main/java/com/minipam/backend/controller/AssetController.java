package com.minipam.backend.controller;

import com.minipam.backend.model.Asset;
import com.minipam.backend.service.AssetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:3000")
public class AssetController {
    private static final Logger logger = LoggerFactory.getLogger(AssetController.class);
    
    @Autowired
    private AssetService assetService;

    @GetMapping("/")
    public ResponseEntity<List<Asset>> getAllAssets() {
        try {
            logger.info("Getting all assets");
            List<Asset> assets = assetService.getAllAssets();
            logger.info("Found {} assets", assets.size());
            return ResponseEntity.ok(assets);
        } catch (Exception e) {
            logger.error("Error getting all assets", e);
            throw e;
        }
    }

    @PostMapping("/")
    public ResponseEntity<Asset> createAsset(@RequestBody Asset asset) {
        try {
            logger.info("Creating new asset: {}", asset.getHostname());
            Asset createdAsset = assetService.createAsset(asset);
            logger.info("Created asset with id: {}", createdAsset.getId());
            return ResponseEntity.ok(createdAsset);
        } catch (Exception e) {
            logger.error("Error creating asset", e);
            throw e;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long id, @RequestBody Asset asset) {
        try {
            logger.info("Updating asset with id: {}", id);
            Asset updatedAsset = assetService.updateAsset(id, asset);
            logger.info("Updated asset with id: {}", id);
            return ResponseEntity.ok(updatedAsset);
        } catch (Exception e) {
            logger.error("Error updating asset with id: {}", id, e);
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        try {
            logger.info("Deleting asset with id: {}", id);
            assetService.deleteAsset(id);
            logger.info("Deleted asset with id: {}", id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error deleting asset with id: {}", id, e);
            throw e;
        }
    }
} 