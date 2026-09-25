package com.vyaparimitra.vyapari_mitra.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vyaparimitra.vyapari_mitra.model.Customer;
import com.vyaparimitra.vyapari_mitra.model.Owner;
import com.vyaparimitra.vyapari_mitra.model.Transaction;
import com.vyaparimitra.vyapari_mitra.repository.CustomerRepository;
import com.vyaparimitra.vyapari_mitra.repository.TransactionRepository;
import com.vyaparimitra.vyapari_mitra.service.BackupService;
import com.vyaparimitra.vyapari_mitra.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class BackupServiceImpl implements BackupService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    private static final String BACKUP_DIR = "backups";
    private static final DateTimeFormatter TIMESTAMP_FORMAT =
            DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

    @Override
    public Map<String, Object> createBackup() {

        // 1. Get current logged-in owner
        Owner currentOwner = ownerService.getCurrentOwner();
        Long ownerId = currentOwner.getId();

        try {
            // 2. Generate unique backup filename
            String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMAT);
            String backupFileName = "backup_owner" + ownerId + "_" + timestamp + ".zip";
            Path backupDirPath = Paths.get(BACKUP_DIR);
            Files.createDirectories(backupDirPath);
            Path backupPath = backupDirPath.resolve(backupFileName);

            // 3. Fetch ONLY this owner's data (data isolation)
            List<Customer> customers = customerRepository.findByOwnerId(ownerId);
            List<Transaction> transactions = transactionRepository
                    .findByOwnerIdAndTransactionDateBetween(
                            ownerId,
                            LocalDateTime.MIN.toLocalDate(),
                            LocalDateTime.MAX.toLocalDate()
                    );

            // 4. Create ZIP archive
            try (ZipOutputStream zip = new ZipOutputStream(Files.newOutputStream(backupPath))) {

                // 4a. Add owner.json
                addJsonEntry(zip, "owner.json", currentOwner);

                // 4b. Add customers.json
                addJsonEntry(zip, "customers.json", customers);

                // 4c. Add transactions.json
                addJsonEntry(zip, "transactions.json", transactions);

                // 4d. Add metadata.json (backup info)
                Map<String, Object> metadata = new HashMap<>();
                metadata.put("ownerId", ownerId);
                metadata.put("shopName", currentOwner.getShopName());
                metadata.put("ownerName", currentOwner.getOwnerName());
                metadata.put("backupTime", LocalDateTime.now().toString());
                metadata.put("customerCount", customers.size());
                metadata.put("transactionCount", transactions.size());
                addJsonEntry(zip, "metadata.json", metadata);

                // 4e. Add uploaded files (images)
                Path uploadsPath = Paths.get(uploadDir);
                if (Files.exists(uploadsPath)) {
                    int fileCount = addUploadedFiles(zip, uploadsPath);
                    System.out.println("Added " + fileCount + " uploaded files to backup");
                }
            }

            // 5. Calculate backup size
            long sizeInBytes = Files.size(backupPath);
            String sizeReadable = formatFileSize(sizeInBytes);

            // 6. Build response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "बॅकअप यशस्वीरित्या तयार झाला! 💾");
            response.put("backupFileName", backupFileName);
            response.put("downloadUrl", "/api/settings/backup/download/" + backupFileName);
            response.put("backupTime", LocalDateTime.now().toString());
            response.put("sizeInBytes", sizeInBytes);
            response.put("sizeReadable", sizeReadable);
            response.put("customerCount", customers.size());
            response.put("transactionCount", transactions.size());

            return response;

        } catch (IOException e) {
            throw new RuntimeException("बॅकअप तयार करताना त्रुटी: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Map<String, Object>> listBackups() {

        Owner currentOwner = ownerService.getCurrentOwner();
        String prefix = "backup_owner" + currentOwner.getId() + "_";

        Path backupDirPath = Paths.get(BACKUP_DIR);
        List<Map<String, Object>> backups = new ArrayList<>();

        if (!Files.exists(backupDirPath)) {
            return backups;
        }

        try {
            backups = Files.list(backupDirPath)
                    .filter(Files::isRegularFile)
                    .filter(path -> path.getFileName().toString().startsWith(prefix))
                    .map(path -> {
                        try {
                            Map<String, Object> info = new HashMap<>();
                            String fileName = path.getFileName().toString();
                            long size = Files.size(path);
                            LocalDateTime created = LocalDateTime.ofInstant(
                                    Files.getLastModifiedTime(path).toInstant(),
                                    java.time.ZoneId.systemDefault()
                            );

                            info.put("fileName", fileName);
                            info.put("sizeInBytes", size);
                            info.put("sizeReadable", formatFileSize(size));
                            info.put("createdAt", created.toString());
                            info.put("downloadUrl", "/api/settings/backup/download/" + fileName);
                            return info;
                        } catch (IOException e) {
                            return null;
                        }
                    })
                    .filter(java.util.Objects::nonNull)
                    .sorted((a, b) -> ((String) b.get("createdAt"))
                            .compareTo((String) a.get("createdAt")))
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new RuntimeException("बॅकअप यादी मिळवताना त्रुटी: " + e.getMessage(), e);
        }

        return backups;
    }

    @Override
    public Path getBackupFile(String fileName) {

        Owner currentOwner = ownerService.getCurrentOwner();

        // Security: Ensure filename belongs to current owner
        String expectedPrefix = "backup_owner" + currentOwner.getId() + "_";
        if (!fileName.startsWith(expectedPrefix)) {
            throw new RuntimeException("तुम्हाला हा बॅकअप डाउनलोड करण्याची परवानगी नाही!");
        }

        // Security: Prevent path traversal
        if (fileName.contains("..") || fileName.contains("/") || fileName.contains("\\")) {
            throw new RuntimeException("अवैध फाइल नाव!");
        }

        Path backupPath = Paths.get(BACKUP_DIR).resolve(fileName);

        if (!Files.exists(backupPath) || !Files.isRegularFile(backupPath)) {
            throw new RuntimeException("बॅकअप फाइल सापडली नाही: " + fileName);
        }

        return backupPath;
    }

    @Override
    public boolean deleteBackup(String fileName) {

        Owner currentOwner = ownerService.getCurrentOwner();

        String expectedPrefix = "backup_owner" + currentOwner.getId() + "_";
        if (!fileName.startsWith(expectedPrefix)) {
            throw new RuntimeException("तुम्हाला हा बॅकअप हटवण्याची परवानगी नाही!");
        }

        if (fileName.contains("..") || fileName.contains("/") || fileName.contains("\\")) {
            throw new RuntimeException("अवैध फाइल नाव!");
        }

        try {
            Path backupPath = Paths.get(BACKUP_DIR).resolve(fileName);
            return Files.deleteIfExists(backupPath);
        } catch (IOException e) {
            throw new RuntimeException("बॅकअप हटवताना त्रुटी: " + e.getMessage(), e);
        }
    }

    // ============================================================
    //                    HELPER METHODS
    // ============================================================

    private void addJsonEntry(ZipOutputStream zip, String entryName, Object data)
            throws IOException {
        zip.putNextEntry(new ZipEntry(entryName));
        zip.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(data));
        zip.closeEntry();
    }

    private int addUploadedFiles(ZipOutputStream zip, Path uploadsPath) throws IOException {
        final int[] count = {0};

        Files.walk(uploadsPath)
                .filter(Files::isRegularFile)
                .forEach(file -> {
                    try {
                        String entryName = "uploads/" + file.getFileName().toString();
                        zip.putNextEntry(new ZipEntry(entryName));
                        Files.copy(file, zip);
                        zip.closeEntry();
                        count[0]++;
                    } catch (IOException e) {
                        System.err.println("Failed to add file to backup: " + file + " - " + e.getMessage());
                    }
                });

        return count[0];
    }

    private String formatFileSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return String.format("%.2f KB", bytes / 1024.0);
        if (bytes < 1024 * 1024 * 1024) return String.format("%.2f MB", bytes / (1024.0 * 1024));
        return String.format("%.2f GB", bytes / (1024.0 * 1024 * 1024));
    }
}