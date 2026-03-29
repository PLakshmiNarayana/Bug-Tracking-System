import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuildService } from '../../../services/build.service';
import { Build } from '../../../models/build.model';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-builds-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './builds-list.component.html',
  styleUrls: ['./builds-list.component.css']
})
export class BuildsListComponent implements OnInit {

  builds: Build[] = [];
  downloadingId: number | null = null;

  constructor(
    private buildService: BuildService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.buildService.getBuilds().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.builds = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => { console.error('Error loading builds', err); }
    });
  }

  downloadBuild(build: Build) {
    this.downloadingId = build.id;
    this.cdr.detectChanges();

    this.buildService.downloadBuild(build.id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = build.fileName || `build-${build.version}.zip`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 300);
        this.ngZone.run(() => {
          this.downloadingId = null;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Download failed', err);
        this.ngZone.run(() => {
          this.downloadingId = null;
          this.cdr.detectChanges();
        });
      }
    });
  }
}