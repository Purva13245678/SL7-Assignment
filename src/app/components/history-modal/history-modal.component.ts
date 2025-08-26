import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Project, HistoryEntry } from '../../models/project.interfaces';

@Component({
  selector: 'app-history-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './history-modal.component.html',
  styleUrl: './history-modal.component.scss'
})
export class HistoryModalComponent {
  project: Project;
  sortedHistory: HistoryEntry[];

  constructor(
    public dialogRef: MatDialogRef<HistoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {
    this.project = data.project;
    this.sortedHistory = [...this.project.history].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getEventIcon(eventType: string): string {
    switch (eventType) {
      case 'Created':
        return 'add_circle';
      case 'Updated':
        return 'edit';
      case 'Assigned':
        return 'person_add';
      case 'Status Change':
        return 'swap_horiz';
      default:
        return 'info';
    }
  }

  getEventColor(eventType: string): string {
    switch (eventType) {
      case 'Created':
        return 'success';
      case 'Updated':
        return 'primary';
      case 'Assigned':
        return 'accent';
      case 'Status Change':
        return 'warn';
      default:
        return 'primary';
    }
  }
}
