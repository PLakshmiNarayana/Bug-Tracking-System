import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BugHistoryService } from '../../services/bug-history.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-bug-history',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './bug-history.component.html',
  styleUrls: ['./bug-history.component.css']
})
export class BugHistoryComponent implements OnInit {

  history: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private historyService: BugHistoryService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    const bugId = this.route.snapshot.params['id'];
    this.historyService.getHistory(bugId).subscribe({
      next: (data: any) => {
        this.ngZone.run(() => {
          this.history = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => { console.error('Error loading history', err); }
    });
  }
}