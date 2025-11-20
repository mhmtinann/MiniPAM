package com.minipam.backend.service;

import com.minipam.backend.model.Asset;
import com.minipam.backend.repository.AssetRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AssetService {
    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    public Asset createAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    public Asset updateAsset(Long id, Asset asset) {
        Optional<Asset> existingAsset = assetRepository.findById(id);
        if (existingAsset.isPresent()) {
            asset.setId(id);
            return assetRepository.save(asset);
        }
        throw new RuntimeException("Asset not found");
    }

    public void deleteAsset(Long id) {
        Optional<Asset> asset = assetRepository.findById(id);
        if (asset.isPresent()) {
            assetRepository.deleteById(id);
        } else {
            throw new RuntimeException("Asset not found");
        }
    }
} 