import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BugService } from '../../services/bug.service';
import { Bug } from '../../models/bug.model';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-assigned-bugs',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './assigned-bugs.component.html',
  styleUrls: ['./assigned-bugs.component.css']
})
export class AssignedBugsComponent implements OnInit {

  bugs: Bug[] = [];

  constructor(
    private bugService: BugService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.bugService.getAssignedBugs().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.bugs = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => { console.error('Error loading assigned bugs', err); }
    });
  }
}