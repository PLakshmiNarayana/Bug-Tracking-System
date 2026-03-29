export interface Build {
  id: number;
  version: string;
  projectName?: string;  // ✅ NEW
  fileName: string;
  filePath: string;
  uploadedAt: string;
}