import { DOCUMENT, NgStyle ,CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
} from '@coreui/angular';
import { CardModule } from '@coreui/angular'; 
import { FormsModule } from '@angular/forms'; 
import { FormModule } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { EventChartsData, IChartProps } from './event-charts-data';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.scss'],
    standalone: true,
    imports: [CommonModule,WidgetsDropdownComponent,CardModule, TextColorDirective, CardComponent,FormsModule,FormModule, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  eventForm = new FormGroup({
    id: new FormControl<number | null>(null),
    titre: new FormControl(''),
    lieu: new FormControl(''),
    dateTime: new FormControl(''),
    topic: new FormControl(''),
    statut: new FormControl(''),
  });
  isEditing = false;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        console.log('Data from backend:', data); // Log the raw data
        this.events = data; // Assign the data to the events array
        console.log('Events:', this.events); // Log the assigned data
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  onSubmit(): void {
    const eventData = this.eventForm.value as Event;
    if (this.isEditing) {
      // Update existing event
      this.eventService.updateEvent(eventData.id!, eventData).subscribe(
        (data) => {
          console.log('Event updated:', data);
          this.loadEvents(); // Refresh the event list
          this.cancelEdit(); // Reset the form and exit editing mode
        },
        (error) => {
          console.error('Error updating event:', error);
        }
      );
    } else {
      // Create new event
      this.eventService.createEvent(eventData).subscribe(
        (data) => {
          console.log('Event created:', data);
          this.loadEvents(); // Refresh the event list
          this.eventForm.reset(); // Clear the form
        },
        (error) => {
          console.error('Error creating event:', error);
        }
      );
    }
  }
  editEvent(event: Event): void {
    this.isEditing = true; // Set editing mode to true
    this.eventForm.patchValue({
      id: event.id,
      titre: event.titre,
      lieu: event.lieu,
      dateTime: event.dateTime,
      topic: event.topic,
      statut: event.statut,
    });
  }
  cancelEdit(): void {
    this.isEditing = false; // Exit editing mode
    this.eventForm.reset(); // Clear the form
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.events = this.events.filter((event) => event.id !== id);
      },
      (error) => {
        console.error('Error deleting event:', error);
      }
    );
  }
}
