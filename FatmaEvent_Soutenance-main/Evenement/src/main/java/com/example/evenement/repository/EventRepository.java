package com.example.evenement.repository;

import com.example.evenement.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findOneById(Long id);  // Use Long instead of String for JPA
}
