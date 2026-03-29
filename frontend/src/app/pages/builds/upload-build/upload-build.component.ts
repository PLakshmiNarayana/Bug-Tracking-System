import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BuildService } from '../../../services/build.service';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-upload-build',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, SidebarComponent],
  templateUrl: './upload-build.component.html',
  styleUrls: ['./upload-build.component.css']
})
export class UploadBuildComponent {

  version: string = '';
  projectName: string = '';  // ✅ NEW
  file: File | null = null;

  uploading = false;
  uploadProgress = 0;

  toastMessage = '';
  toastType = '';
  showToast = false;

  constructor(
    private buildService: BuildService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  showNotification(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 3000);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0] || null;
  }

  removeFile(event: Event) {
    event.stopPropagation();
    this.file = null;
  }

  uploadBuild() {
    if (!this.version.trim() || !this.projectName.trim() || !this.file) {
      this.showNotification('Please fill in all required fields.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('version', this.version);
    formData.append('projectName', this.projectName);  // ✅ NEW
    formData.append('file', this.file);

    this.uploading = true;
    this.uploadProgress = 0;

    const progressInterval = setInterval(() => {
      if (this.uploadProgress < 85) { this.uploadProgress += 5; }
      this.cdr.detectChanges();
    }, 120);

    this.buildService.uploadBuild(formData).subscribe({
      next: () => {
        this.ngZone.run(() => {
          clearInterval(progressInterval);
          this.uploadProgress = 100;
          this.uploading = false;
          this.showNotification('Build uploaded successfully!', 'success');
          this.cdr.detectChanges();
          setTimeout(() => this.router.navigate(['/builds']), 1200);
        });
      },
      error: () => {
        this.ngZone.run(() => {
          clearInterval(progressInterval);
          this.uploading = false;
          this.uploadProgress = 0;
          this.showNotification('Build upload failed. Please try again.', 'error');
          this.cdr.detectChanges();
        });
      }
    });
  }
}