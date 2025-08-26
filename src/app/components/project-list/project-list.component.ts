import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.interfaces';
import { HistoryModalComponent } from '../history-modal/history-modal.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm = '';
  statusFilter = '';
  sortBy = 'startDate';
  
  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.projectService.getProjects()
    ]).pipe(
      takeUntil(this.destroy$),
      map(([projects]) => this.filterAndSortProjects(projects))
    ).subscribe(filteredProjects => {
      this.projects = filteredProjects;
      this.filteredProjects = filteredProjects;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filterAndSortProjects(projects: Project[]): Project[] {
    let filtered = projects;

    if (this.searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.owner.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter(project => project.status === this.statusFilter);
    }

    filtered.sort((a, b) => {
      if (this.sortBy === 'startDate') {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      } else if (this.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

    return filtered;
  }

  onSearchChange(): void {
    this.filteredProjects = this.filterAndSortProjects(this.projects);
  }

  onStatusFilterChange(): void {
    this.filteredProjects = this.filterAndSortProjects(this.projects);
  }

  onSortChange(): void {
    this.filteredProjects = this.filterAndSortProjects(this.projects);
  }

  toggleExpansion(project: Project): void {
    this.projectService.toggleProjectExpansion(project.id);
  }

  openHistoryModal(project: Project): void {
    this.dialog.open(HistoryModalComponent, {
      width: '600px',
      data: { project }
    });
  }

  openEditModal(project: Project): void {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: '800px',
      data: { project }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Project updated:', result);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'primary';
      case 'On Hold':
        return 'warn';
      case 'Completed':
        return 'accent';
      default:
        return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'On Hold':
        return 'status-on-hold';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Active':
        return 'play_circle';
      case 'On Hold':
        return 'pause_circle';
      case 'Completed':
        return 'check_circle';
      default:
        return 'info';
    }
  }
}
