package com.vyaparimitra.vyapari_mitra.service;

import java.util.List;
import java.util.Map;

public interface BackupService {

    // Create a new backup for current owner
    Map<String, Object> createBackup();

    // Get list of all backups for current owner
    List<Map<String, Object>> listBackups();

    // Get backup file path for download
    java.nio.file.Path getBackupFile(String fileName);

    // Delete a backup
    boolean deleteBackup(String fileName);
}