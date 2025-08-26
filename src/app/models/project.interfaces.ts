export interface Employee {
  id: string;
  name: string;
  avatar?: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: Date;
  eventType: 'Created' | 'Updated' | 'Assigned' | 'Status Change';
  notes: string;
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  status: 'Active' | 'On Hold' | 'Completed';
  startDate: Date;
  description: string;
  tags: string[];
  teamMembers: Employee[];
  progress: number;
  lastUpdated: Date;
  history: HistoryEntry[];
  expanded?: boolean;
}