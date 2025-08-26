import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProjectService } from '../../services/project.service';
import { Project, Employee } from '../../models/project.interfaces';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatSliderModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent implements OnInit {
  editForm: FormGroup;
  project: Project;
  availableEmployees: Employee[] = [];
  projectTeamMembers: Employee[] = [];
  tags: string[] = [];
  
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {
    this.project = { ...data.project };
    this.projectTeamMembers = [...this.project.teamMembers];
    this.tags = [...this.project.tags];
    
    this.editForm = this.fb.group({
      name: [this.project.name, [Validators.required, Validators.minLength(3)]],
      owner: [this.project.owner, [Validators.required]],
      status: [this.project.status, [Validators.required]],
      description: [this.project.description, [Validators.required, Validators.minLength(10)]],
      progress: [this.project.progress, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.availableEmployees = this.projectService.getAvailableEmployees()
      .filter(emp => !this.projectTeamMembers.some(member => member.id === emp.id));
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addTeamMember(employee: Employee): void {
    if (!this.projectTeamMembers.some(member => member.id === employee.id)) {
      this.projectTeamMembers.push(employee);
      this.availableEmployees = this.availableEmployees.filter(emp => emp.id !== employee.id);
    }
  }

  removeTeamMember(employee: Employee): void {
    this.projectTeamMembers = this.projectTeamMembers.filter(member => member.id !== employee.id);
    if (!this.availableEmployees.some(emp => emp.id === employee.id)) {
      this.availableEmployees.push(employee);
      this.availableEmployees.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedProject: Partial<Project> = {
        ...this.editForm.value,
        tags: this.tags,
        teamMembers: this.projectTeamMembers
      };

      this.projectService.updateProject(this.project.id, updatedProject);
      this.dialogRef.close(updatedProject);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  formatLabel(value: number | null): string {
    if (!value) {
      return '0%';
    }
    return value + '%';
  }
}
