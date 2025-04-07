package com.example.evenement.model;
import jakarta.persistence.GenerationType;

import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.Id;  // Use this import for JPA


import java.time.LocalDateTime;

@Entity
@Table(name = "evenement")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    @Column(nullable = false)
    private String lieu;

    @Column(name = "date_time", nullable = false)
    private LocalDateTime dateTime;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false)
    private String statut;  // No ENUM, just a String field

//    @ManyToOne
//    @JoinColumn(name = "admin_id", nullable = false)
//    private Admin admin;
}
