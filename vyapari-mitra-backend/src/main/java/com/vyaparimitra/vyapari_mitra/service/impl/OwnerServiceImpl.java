package com.vyaparimitra.vyapari_mitra.service.impl;

import com.vyaparimitra.vyapari_mitra.dto.LoginRequestDTO;
import com.vyaparimitra.vyapari_mitra.dto.RegisterRequestDTO;
import com.vyaparimitra.vyapari_mitra.model.Owner;
import com.vyaparimitra.vyapari_mitra.repository.OwnerRepository;
import com.vyaparimitra.vyapari_mitra.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class OwnerServiceImpl implements OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    // ============================================================
    //         🔴 REGISTER — फक्त पहिलाच owner register होऊ शकतो
    // ============================================================
    @Override
    @Transactional
    public Owner register(RegisterRequestDTO registerRequest) {

        // 🔴 MAIN CHECK: आधीच owner आहे का?
        long existingOwners = ownerRepository.count();

        if (existingOwners > 0) {
            throw new RuntimeException(
                    "मालक आधीच नोंदणीकृत आहे! " +
                            "फक्त एकच मालक असू शकतो. कृपया लॉगिन करा."
            );
        }

        // ✅ Validation
        if (registerRequest.getShopName() == null || registerRequest.getShopName().trim().isEmpty()) {
            throw new RuntimeException("दुकानाचे नाव आवश्यक आहे!");
        }

        if (registerRequest.getOwnerName() == null || registerRequest.getOwnerName().trim().isEmpty()) {
            throw new RuntimeException("मालकाचे नाव आवश्यक आहे!");
        }

        String mobile = registerRequest.getMobile();
        if (mobile == null || mobile.length() != 10 || !mobile.matches("\\d+")) {
            throw new RuntimeException("मोबाईल नंबर १० अंकी असणे आवश्यक आहे!");
        }

        String pin = registerRequest.getPin();
        if (pin == null || pin.length() != 4 || !pin.matches("\\d+")) {
            throw new RuntimeException("पिन ४ अंकी असणे आवश्यक आहे!");
        }

        // 🔴 Double-check (race condition साठी)
        synchronized (OwnerServiceImpl.class) {
            if (ownerRepository.count() > 0) {
                throw new RuntimeException("मालक आधीच नोंदणीकृत आहे!");
            }

            Owner owner = new Owner();
            owner.setShopName(registerRequest.getShopName().trim());
            owner.setOwnerName(registerRequest.getOwnerName().trim());
            owner.setMobile(mobile);
            owner.setPin(pin);
            owner.setRegisteredAt(LocalDateTime.now());

            return ownerRepository.save(owner);
        }
    }

    // ============================================================
    //                          LOGIN
    // ============================================================
    @Override
    public Owner login(LoginRequestDTO loginRequest) {
        Owner owner = ownerRepository.findByMobile(loginRequest.getMobile())
                .orElseThrow(() -> new RuntimeException("मोबाईल नंबर सापडला नाही!"));

        if (!owner.getPin().equals(loginRequest.getPin())) {
            throw new RuntimeException("चुकीचा PIN!");
        }

        return owner;
    }

    @Override
    public boolean isOwnerExists() {
        return ownerRepository.count() > 0;
    }

    @Override
    public Owner getOwnerDetails() {
        return ownerRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new RuntimeException("मालक सापडला नाही!"));
    }

    @Override
    public Owner updatePin(String oldPin, String newPin) {
        Owner owner = getOwnerDetails();

        if (!owner.getPin().equals(oldPin)) {
            throw new RuntimeException("जुना PIN चुकीचा आहे!");
        }

        if (newPin == null || newPin.length() != 4 || !newPin.matches("\\d+")) {
            throw new RuntimeException("नवीन पिन ४ अंकी असणे आवश्यक आहे!");
        }

        owner.setPin(newPin);
        return ownerRepository.save(owner);
    }

    @Override
    public Owner updateShopDetails(String shopName, String ownerName) {
        Owner owner = getOwnerDetails();

        if (shopName != null && !shopName.trim().isEmpty()) {
            owner.setShopName(shopName.trim());
        }
        if (ownerName != null && !ownerName.trim().isEmpty()) {
            owner.setOwnerName(ownerName.trim());
        }

        return ownerRepository.save(owner);
    }

    @Override
    public Owner getCurrentOwner() {
        return getOwnerDetails();
    }
}