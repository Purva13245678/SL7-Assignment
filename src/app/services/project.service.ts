import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, Employee, HistoryEntry } from '../models/project.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectsSubject.asObservable();

  private dummyEmployees: Employee[] = [
    { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/40?u=john' },
    { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/40?u=jane' },
    { id: '3', name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/40?u=mike' },
    { id: '4', name: 'Sarah Wilson', avatar: 'https://i.pravatar.cc/40?u=sarah' },
    { id: '5', name: 'David Brown', avatar: 'https://i.pravatar.cc/40?u=david' },
    { id: '6', name: 'Emily Davis', avatar: 'https://i.pravatar.cc/40?u=emily' },
    { id: '7', name: 'Chris Miller', avatar: 'https://i.pravatar.cc/40?u=chris' },
    { id: '8', name: 'Lisa Garcia', avatar: 'https://i.pravatar.cc/40?u=lisa' }
  ];

  private dummyProjects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Platform',
      owner: 'John Doe',
      status: 'Active',
      startDate: new Date('2024-01-15'),
      description: 'Building a modern e-commerce platform with React and Node.js',
      tags: ['React', 'Node.js', 'MongoDB', 'Payment'],
      teamMembers: [
        this.dummyEmployees[0],
        this.dummyEmployees[1],
        this.dummyEmployees[2]
      ],
      progress: 75,
      lastUpdated: new Date('2024-08-20'),
      history: [
        {
          id: 'h1',
          timestamp: new Date('2024-01-15'),
          eventType: 'Created',
          notes: 'Project created and initial team assigned'
        },
        {
          id: 'h2',
          timestamp: new Date('2024-03-10'),
          eventType: 'Updated',
          notes: 'Added payment gateway integration milestone'
        },
        {
          id: 'h3',
          timestamp: new Date('2024-06-05'),
          eventType: 'Assigned',
          notes: 'Mike Johnson assigned as lead developer'
        },
        {
          id: 'h4',
          timestamp: new Date('2024-08-20'),
          eventType: 'Updated',
          notes: 'Progress updated to 75% - payment module completed'
        }
      ]
    },
    {
      id: '2',
      name: 'Mobile App Development',
      owner: 'Sarah Wilson',
      status: 'On Hold',
      startDate: new Date('2024-02-01'),
      description: 'Cross-platform mobile application using Flutter',
      tags: ['Flutter', 'Firebase', 'iOS', 'Android'],
      teamMembers: [
        this.dummyEmployees[3],
        this.dummyEmployees[4]
      ],
      progress: 40,
      lastUpdated: new Date('2024-07-15'),
      history: [
        {
          id: 'h5',
          timestamp: new Date('2024-02-01'),
          eventType: 'Created',
          notes: 'Mobile app project initiated'
        },
        {
          id: 'h6',
          timestamp: new Date('2024-04-20'),
          eventType: 'Status Change',
          notes: 'Project put on hold due to resource constraints'
        },
        {
          id: 'h7',
          timestamp: new Date('2024-07-15'),
          eventType: 'Updated',
          notes: 'Updated project timeline and requirements'
        }
      ]
    },
    {
      id: '3',
      name: 'Data Analytics Dashboard',
      owner: 'Emily Davis',
      status: 'Completed',
      startDate: new Date('2023-11-01'),
      description: 'Business intelligence dashboard with real-time analytics',
      tags: ['Angular', 'D3.js', 'PostgreSQL', 'Analytics'],
      teamMembers: [
        this.dummyEmployees[5],
        this.dummyEmployees[6],
        this.dummyEmployees[7]
      ],
      progress: 100,
      lastUpdated: new Date('2024-03-15'),
      history: [
        {
          id: 'h8',
          timestamp: new Date('2023-11-01'),
          eventType: 'Created',
          notes: 'Analytics dashboard project started'
        },
        {
          id: 'h9',
          timestamp: new Date('2024-01-10'),
          eventType: 'Updated',
          notes: 'Added real-time data streaming capabilities'
        },
        {
          id: 'h10',
          timestamp: new Date('2024-03-15'),
          eventType: 'Status Change',
          notes: 'Project completed and deployed to production'
        }
      ]
    },
    {
      id: '4',
      name: 'API Gateway Microservice',
      owner: 'Chris Miller',
      status: 'Active',
      startDate: new Date('2024-05-01'),
      description: 'Scalable API gateway for microservices architecture',
      tags: ['Go', 'Docker', 'Kubernetes', 'API'],
      teamMembers: [
        this.dummyEmployees[6],
        this.dummyEmployees[1],
        this.dummyEmployees[4]
      ],
      progress: 60,
      lastUpdated: new Date('2024-08-22'),
      history: [
        {
          id: 'h11',
          timestamp: new Date('2024-05-01'),
          eventType: 'Created',
          notes: 'API Gateway project initiated'
        },
        {
          id: 'h12',
          timestamp: new Date('2024-07-10'),
          eventType: 'Assigned',
          notes: 'Jane Smith assigned as DevOps lead'
        },
        {
          id: 'h13',
          timestamp: new Date('2024-08-22'),
          eventType: 'Updated',
          notes: 'Load balancing and security features implemented'
        }
      ]
    },
    {
      id: '5',
      name: 'Machine Learning Pipeline',
      owner: 'Lisa Garcia',
      status: 'Active',
      startDate: new Date('2024-06-15'),
      description: 'MLOps pipeline for automated model training and deployment',
      tags: ['Python', 'TensorFlow', 'AWS', 'MLOps'],
      teamMembers: [
        this.dummyEmployees[7],
        this.dummyEmployees[0],
        this.dummyEmployees[3]
      ],
      progress: 30,
      lastUpdated: new Date('2024-08-18'),
      history: [
        {
          id: 'h14',
          timestamp: new Date('2024-06-15'),
          eventType: 'Created',
          notes: 'ML Pipeline project created'
        },
        {
          id: 'h15',
          timestamp: new Date('2024-07-20'),
          eventType: 'Updated',
          notes: 'Data preprocessing pipeline completed'
        },
        {
          id: 'h16',
          timestamp: new Date('2024-08-18'),
          eventType: 'Assigned',
          notes: 'John Doe assigned as ML engineer'
        }
      ]
    },
    {
      id: '6',
      name: 'Security Audit System',
      owner: 'David Brown',
      status: 'On Hold',
      startDate: new Date('2024-04-01'),
      description: 'Automated security scanning and vulnerability assessment tool',
      tags: ['Security', 'Python', 'OWASP', 'Automation'],
      teamMembers: [
        this.dummyEmployees[4],
        this.dummyEmployees[2]
      ],
      progress: 25,
      lastUpdated: new Date('2024-06-30'),
      history: [
        {
          id: 'h17',
          timestamp: new Date('2024-04-01'),
          eventType: 'Created',
          notes: 'Security audit project initiated'
        },
        {
          id: 'h18',
          timestamp: new Date('2024-05-15'),
          eventType: 'Updated',
          notes: 'Initial security scanning modules developed'
        },
        {
          id: 'h19',
          timestamp: new Date('2024-06-30'),
          eventType: 'Status Change',
          notes: 'Project paused pending security framework approval'
        }
      ]
    }
  ];

  constructor() {
    this.projectsSubject.next(this.dummyProjects);
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectById(id: string): Project | undefined {
    return this.projectsSubject.value.find(p => p.id === id);
  }

  updateProject(id: string, updatedData: Partial<Project>): void {
    const projects = this.projectsSubject.value;
    const index = projects.findIndex(p => p.id === id);
    
    if (index !== -1) {
      const updatedProject = { 
        ...projects[index], 
        ...updatedData, 
        lastUpdated: new Date() 
      };
      
      const historyEntry: HistoryEntry = {
        id: `h${Date.now()}`,
        timestamp: new Date(),
        eventType: 'Updated',
        notes: 'Project details updated'
      };
      
      updatedProject.history = [...updatedProject.history, historyEntry];
      projects[index] = updatedProject;
      this.projectsSubject.next([...projects]);
    }
  }

  addTeamMember(projectId: string, employee: Employee): void {
    const projects = this.projectsSubject.value;
    const project = projects.find(p => p.id === projectId);
    
    if (project && !project.teamMembers.some(member => member.id === employee.id)) {
      project.teamMembers = [...project.teamMembers, employee];
      project.lastUpdated = new Date();
      
      const historyEntry: HistoryEntry = {
        id: `h${Date.now()}`,
        timestamp: new Date(),
        eventType: 'Assigned',
        notes: `${employee.name} added to team`
      };
      
      project.history = [...project.history, historyEntry];
      this.projectsSubject.next([...projects]);
    }
  }

  removeTeamMember(projectId: string, employeeId: string): void {
    const projects = this.projectsSubject.value;
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
      const memberToRemove = project.teamMembers.find(m => m.id === employeeId);
      project.teamMembers = project.teamMembers.filter(member => member.id !== employeeId);
      project.lastUpdated = new Date();
      
      if (memberToRemove) {
        const historyEntry: HistoryEntry = {
          id: `h${Date.now()}`,
          timestamp: new Date(),
          eventType: 'Updated',
          notes: `${memberToRemove.name} removed from team`
        };
        
        project.history = [...project.history, historyEntry];
      }
      
      this.projectsSubject.next([...projects]);
    }
  }

  getAvailableEmployees(): Employee[] {
    return this.dummyEmployees;
  }

  toggleProjectExpansion(projectId: string): void {
    const projects = this.projectsSubject.value;
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
      project.expanded = !project.expanded;
      this.projectsSubject.next([...projects]);
    }
  }
}
