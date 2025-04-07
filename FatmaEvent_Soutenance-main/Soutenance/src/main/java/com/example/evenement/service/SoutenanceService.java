package com.example.evenement.service;

import com.example.evenement.model.Soutenance;
import com.example.evenement.repository.SoutenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SoutenanceService {

    @Autowired
    private SoutenanceRepository soutenanceRepository;

    // Create or Update Soutenance
    public Soutenance saveSoutenance(Soutenance soutenance) {
        return soutenanceRepository.save(soutenance);
    }

    // Read: Get all soutenances
    public List<Soutenance> getAllSoutenances() {
        return soutenanceRepository.findAll();
    }

    // Read: Get a single soutenance by id
    public Soutenance getSoutenanceById(int idSoutenance) {
        Optional<Soutenance> soutenanceOptional = soutenanceRepository.findById(idSoutenance);
        return soutenanceOptional.orElse(null);  // Return null or handle not found case
    }

    // Update: Update an existing soutenance
    public Soutenance updateSoutenance(int idSoutenance, Soutenance updatedSoutenance) {
        // Check if the soutenance exists before updating
        if (soutenanceRepository.existsById(idSoutenance)) {
            updatedSoutenance.setIdSoutenance(idSoutenance);  // Ensure that the id is preserved
            return soutenanceRepository.save(updatedSoutenance);
        }
        return null;  // Soutenance not found
    }

    // Delete Soutenance
    public void deleteSoutenance(int idSoutenance) {
        soutenanceRepository.deleteById(idSoutenance);
    }

    // Delete All Soutenances
    public void deleteAllSoutenances() {
        soutenanceRepository.deleteAll();
    }
}