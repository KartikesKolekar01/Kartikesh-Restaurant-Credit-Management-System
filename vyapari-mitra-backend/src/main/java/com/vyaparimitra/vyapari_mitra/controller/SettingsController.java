package com.vyaparimitra.vyapari_mitra.controller;

import com.vyaparimitra.vyapari_mitra.model.Owner;
import com.vyaparimitra.vyapari_mitra.service.BackupService;
import com.vyaparimitra.vyapari_mitra.service.OwnerService;
import com.vyaparimitra.vyapari_mitra.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private BackupService backupService;

    // ============================================================
    //                    SHOP DETAILS
    // ============================================================

    // Get shop details
    @GetMapping("/shop")
    public ResponseEntity<?> getShopDetails() {
        try {
            Owner owner = ownerService.getOwnerDetails();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", owner);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        }
    }

    // Update shop details
    @PutMapping("/shop")
    public ResponseEntity<?> updateShopDetails(
            @RequestParam(required = false) String shopName,
            @RequestParam(required = false) String ownerName) {
        try {
            Owner owner = ownerService.updateShopDetails(shopName, ownerName);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "दुकानाची माहिती अद्यावत केली! ✅");
            response.put("data", owner);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    // ============================================================
    //                        PIN UPDATE
    // ============================================================

    // Update PIN
    @PutMapping("/pin")
    public ResponseEntity<?> updatePin(
            @RequestParam String oldPin,
            @RequestParam String newPin) {
        try {
            Owner owner = ownerService.updatePin(oldPin, newPin);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "पिन यशस्वीरित्या बदलला! 🔐");
            response.put("data", owner);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    // ============================================================
    //                     STORAGE INFO
    // ============================================================

    // Get storage info
    @GetMapping("/storage")
    public ResponseEntity<?> getStorageInfo() {
        try {
            Map<String, Object> storageInfo = new HashMap<>();

            // You can implement actual storage size calculation
            storageInfo.put("totalPhotos", 0); // TODO: Count photos
            storageInfo.put("storageUsed", "0 MB");

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", storageInfo);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ============================================================
    //                        BACKUP
    // ============================================================

    /**
     * Create a new backup (ZIP with all data + uploaded files)
     * POST /api/settings/backup
     */
    @PostMapping("/backup")
    public ResponseEntity<?> createBackup() {
        try {
            Map<String, Object> result = backupService.createBackup();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Download a backup file
     * GET /api/settings/backup/download/{fileName}
     */
    @GetMapping("/backup/download/{fileName}")
    public ResponseEntity<?> downloadBackup(@PathVariable String fileName) {
        try {
            Path backupPath = backupService.getBackupFile(fileName);
            Resource resource = new UrlResource(backupPath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "बॅकअप फाइल वाचता आली नाही!");
                return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + fileName + "\"")
                    .body(resource);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * List all backups for current owner
     * GET /api/settings/backup/list
     */
    @GetMapping("/backup/list")
    public ResponseEntity<?> listBackups() {
        try {
            List<Map<String, Object>> backups = backupService.listBackups();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("count", backups.size());
            response.put("data", backups);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a backup
     * DELETE /api/settings/backup/{fileName}
     */
    @DeleteMapping("/backup/{fileName}")
    public ResponseEntity<?> deleteBackup(@PathVariable String fileName) {
        try {
            boolean deleted = backupService.deleteBackup(fileName);

            Map<String, Object> response = new HashMap<>();
            if (deleted) {
                response.put("success", true);
                response.put("message", "बॅकअप यशस्वीरित्या हटवला! 🗑️");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "बॅकअप फाइल सापडली नाही!");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }
}