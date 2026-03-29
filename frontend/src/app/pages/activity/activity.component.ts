import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activities: any[] = [];

  constructor(
    private activityService: ActivityService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.activityService.getActivities().subscribe({
      next: (data: any[]) => {
        this.ngZone.run(() => {
          this.activities = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => { console.error('Error loading activities', err); }
    });
  }
}