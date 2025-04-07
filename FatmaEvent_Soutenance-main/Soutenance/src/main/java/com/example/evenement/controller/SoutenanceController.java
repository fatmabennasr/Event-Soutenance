package com.example.evenement.controller;

import com.example.evenement.model.Soutenance;
import com.example.evenement.service.SoutenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/soutenances")
public class SoutenanceController {

    @Autowired
    private SoutenanceService soutenanceService;

    // Create Soutenance
    @PostMapping
    public ResponseEntity<Soutenance> createSoutenance(@RequestBody Soutenance soutenance) {
        Soutenance savedSoutenance = soutenanceService.saveSoutenance(soutenance);
        return new ResponseEntity<>(savedSoutenance, HttpStatus.CREATED);
    }

    // Get All Soutenances
    @GetMapping
    public List<Soutenance> getAllSoutenances() {
        return soutenanceService.getAllSoutenances();
    }

    // Get Soutenance by ID
    @GetMapping("/{idSoutenance}")
    public ResponseEntity<Soutenance> getSoutenanceById(@PathVariable int idSoutenance) {
        Soutenance soutenance = soutenanceService.getSoutenanceById(idSoutenance);
        if (soutenance == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(soutenance, HttpStatus.OK);
    }

    // Update Soutenance
    @PutMapping("/{idSoutenance}")
    public ResponseEntity<Soutenance> updateSoutenance(@PathVariable int idSoutenance, @RequestBody Soutenance updatedSoutenance) {
        Soutenance soutenance = soutenanceService.updateSoutenance(idSoutenance, updatedSoutenance);
        if (soutenance == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(soutenance, HttpStatus.OK);
    }

    // Delete Soutenance
    @DeleteMapping("/{idSoutenance}")
    public ResponseEntity<Void> deleteSoutenance(@PathVariable int idSoutenance) {
        soutenanceService.deleteSoutenance(idSoutenance);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Delete All Soutenances
    @DeleteMapping
    public ResponseEntity<Void> deleteAllSoutenances() {
        soutenanceService.deleteAllSoutenances();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}