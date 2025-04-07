import { DOCUMENT, NgStyle, CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { Soutenance } from '../../models/soutenance.model';
import { SoutenanceService } from '../../services/soutenance.service';
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
import { SoutenanceChartsData, IChartProps } from './soutenance-charts-data';

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
  templateUrl: 'soutenance.component.html',
  styleUrls: ['soutenance.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    WidgetsDropdownComponent,
    CardModule,
    TextColorDirective,
    CardComponent,
    FormsModule,
    FormModule,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    ChartjsComponent,
    NgStyle,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    WidgetsBrandComponent,
    CardHeaderComponent,
    TableDirective,
    AvatarComponent,
  ],
})
export class SoutenanceComponent implements OnInit {
  soutenances: Soutenance[] = [];
  soutenanceForm = new FormGroup({
    idSoutenance: new FormControl<number | null>(null),
    idEnseignant: new FormControl<number | null>(null),
    idEtudiant: new FormControl<number | null>(null),
    dateSoutenance: new FormControl(''),
    lieu: new FormControl(''),
    salle: new FormControl(''),
    time: new FormControl(''),
    bloc: new FormControl(''),
  });
  isEditing = false;

  constructor(private soutenanceService: SoutenanceService) {}

  ngOnInit(): void {
    this.loadSoutenances();
  }

  loadSoutenances(): void {
    this.soutenanceService.getAllSoutenances().subscribe(
      (data) => {
        console.log('Data from backend:', data); // Log the raw data
        this.soutenances = data; // Assign the data to the soutenances array
        console.log('Soutenances:', this.soutenances); // Log the assigned data
      },
      (error) => {
        console.error('Error fetching soutenances:', error);
      }
    );
  }

  onSubmit(): void {
    const soutenanceData = this.soutenanceForm.value as Soutenance;
    if (this.isEditing) {
      // Update existing soutenance
      this.soutenanceService.updateSoutenance(soutenanceData.idSoutenance!, soutenanceData).subscribe(
        (data) => {
          console.log('Soutenance updated:', data);
          this.loadSoutenances(); // Refresh the soutenance list
          this.cancelEdit(); // Reset the form and exit editing mode
        },
        (error) => {
          console.error('Error updating soutenance:', error);
        }
      );
    } else {
      // Create new soutenance
      this.soutenanceService.createSoutenance(soutenanceData).subscribe(
        (data) => {
          console.log('Soutenance created:', data);
          this.loadSoutenances(); // Refresh the soutenance list
          this.soutenanceForm.reset(); // Clear the form
        },
        (error) => {
          console.error('Error creating soutenance:', error);
        }
      );
    }
  }

  editSoutenance(soutenance: Soutenance): void {
    this.isEditing = true; // Set editing mode to true
    this.soutenanceForm.patchValue({
      idSoutenance: soutenance.idSoutenance,
      idEnseignant: soutenance.idEnseignant,
      idEtudiant: soutenance.idEtudiant,
      dateSoutenance: soutenance.dateSoutenance,
      lieu: soutenance.lieu,
      salle: soutenance.salle,
      time: soutenance.time,
      bloc: soutenance.bloc,
    });
  }

  cancelEdit(): void {
    this.isEditing = false; // Exit editing mode
    this.soutenanceForm.reset(); // Clear the form
  }

  deleteSoutenance(id: number): void {
    this.soutenanceService.deleteSoutenance(id).subscribe(
      () => {
        this.soutenances = this.soutenances.filter((soutenance) => soutenance.idSoutenance !== id);
      },
      (error) => {
        console.error('Error deleting soutenance:', error);
      }
    );
  }
}