package com.example.evenement.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "soutenance")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Soutenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idSoutenance;

    @Column(nullable = false)
    private int idEnseignant;

    @Column(nullable = false)
    private int idEtudiant;

    @Column(name = "date_soutenance", nullable = false)
    private LocalDate dateSoutenance;

    @Column(nullable = false)
    private String lieu;

    @Column(nullable = false)
    private String salle;

    @Column(name = "time", nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private String bloc;
}