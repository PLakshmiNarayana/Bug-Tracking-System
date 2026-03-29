export interface Bug {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignedTo: any;
  createdBy: any;
  createdDate: string;
  updatedDate: string;
  module?: string;
  projectName?: string;  // ✅ NEW
  screenshot?: string;
}