import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalBugs = 0;
  openBugs = 0;
  resolvedBugs = 0;
  criticalBugs = 0;
  loaded = false;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (res: any) => {
        this.ngZone.run(() => {
          this.totalBugs    = res.totalBugs;
          this.openBugs     = res.openBugs;
          this.resolvedBugs = res.resolvedBugs;
          this.criticalBugs = res.criticalBugs;
          this.loaded = true;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error('Dashboard error:', err);
          this.loaded = true;
          this.cdr.detectChanges();
        });
      }
    });
  }
}