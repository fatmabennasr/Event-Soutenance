package com.example.evenement.repository;

import com.example.evenement.model.Soutenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoutenanceRepository extends JpaRepository<Soutenance, Integer> {
    Soutenance findOneByIdSoutenance(int idSoutenance);
}