import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BugService } from '../../services/bug.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-create-bug',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, SidebarComponent],
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.css']
})
export class CreateBugComponent {

  title = '';
  description = '';
  priority = 'MEDIUM';
  module = 'FRONTEND';
  projectName = '';  // ✅ NEW
  selectedFile: File | null = null;

  toastMessage = '';
  toastType = '';
  showToast = false;

  constructor(private bugService: BugService, private router: Router) {}

  showNotification(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 3000);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  removeFile(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
  }

  createBug() {
    if (!this.title.trim() || !this.description.trim() || !this.projectName.trim()) {
      this.showNotification('Please fill in title, description and project name.', 'error');
      return;
    }

    const bugData = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      module: this.module,
      projectName: this.projectName  // ✅ NEW
    };

    this.bugService.createBug(bugData).subscribe({
      next: (bug: any) => {
        const bugId = bug.id;
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('file', this.selectedFile);
          this.bugService.uploadScreenshot(bugId, formData).subscribe({
            next: () => {
              this.showNotification('Bug reported with screenshot!', 'success');
              setTimeout(() => this.router.navigate(['/bugs']), 1200);
            },
            error: () => {
              this.showNotification('Bug created but screenshot upload failed.', 'error');
              setTimeout(() => this.router.navigate(['/bugs']), 1500);
            }
          });
        } else {
          this.showNotification('Bug reported successfully!', 'success');
          setTimeout(() => this.router.navigate(['/bugs']), 1200);
        }
      },
      error: (err) => {
        console.error('Bug creation error:', err);
        this.showNotification('Failed to create bug. Please try again.', 'error');
      }
    });
  }
}