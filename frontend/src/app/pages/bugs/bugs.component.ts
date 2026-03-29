import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BugService } from '../../services/bug.service';
import { Bug } from '../../models/bug.model';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  bugs: Bug[] = [];

  constructor(
    private bugService: BugService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.bugService.getAllBugs().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.bugs = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => { console.error('Error loading bugs:', err); }
    });
  }
}