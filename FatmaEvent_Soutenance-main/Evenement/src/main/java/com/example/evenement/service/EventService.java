package com.example.evenement.service;

import com.example.evenement.model.Event;
import com.example.evenement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // Create or Update Event (for both create and update)
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    // Read: Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Read: Get a single event by id
    public Event getEventById(Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        return eventOptional.orElse(null);  // Return null or handle not found case
    }

    // Update: (same as saveEvent for now, since save also works for updates)
    public Event updateEvent(Long id, Event updatedEvent) {
        // Check if the event exists before updating
        if (eventRepository.existsById(id)) {
            updatedEvent.setId(id);  // Ensure that the id is preserved
            return eventRepository.save(updatedEvent);
        }
        return null;  // Event not found
    }

    // Delete Event
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    // Delete All Events
    public void deleteAllEvents() {
        eventRepository.deleteAll();
    }
}
