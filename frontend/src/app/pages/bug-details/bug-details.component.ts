import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BugService } from '../../services/bug.service';
import { CommentService } from '../../services/comment.service';
import { Bug } from '../../models/bug.model';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-bug-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit, OnDestroy {

  bug: Bug | null = null;
  comments: any[] = [];
  newComment = '';
  loadError = false;
  currentUserId: number = 0;
  currentUserRole: string = '';
  private destroy$ = new Subject<void>();

  statusOptions = ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

  // Assign feature
  developers: any[] = [];
  selectedDeveloperId: number | null = null;
  assigning = false;

  toastMessage = '';
  toastType = '';
  showToast = false;

  constructor(
    private route: ActivatedRoute,
    private bugService: BugService,
    private commentService: CommentService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    try {
      const raw = localStorage.getItem('user');
      if (raw && raw !== 'undefined') {
        const user = JSON.parse(raw);
        this.currentUserId = user.id;
        this.currentUserRole = user.role;
      }
    } catch (e) {}

    // Load developers list if ADMIN
    if (this.currentUserRole === 'ADMIN') {
      this.http.get<any[]>('http://localhost:8080/api/users')
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (users) => {
            this.developers = users.filter(u => u.role === 'DEVELOPER');
            this.cdr.detectChanges();
          }
        });
    }

    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = Number(params.get('id'));
        this.bug = null;
        this.loadError = false;
        this.comments = [];
        this.loadBug(id);
        this.loadComments(id);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBug(id: number) {
    this.bugService.getBugById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Bug) => {
          this.ngZone.run(() => {
            this.bug = data;
            // Pre-select current assignee in dropdown
            this.selectedDeveloperId = data.assignedTo?.id ?? null;
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            console.error('Error loading bug', err);
            this.loadError = true;
            this.cdr.detectChanges();
          });
        }
      });
  }

  loadComments(id: number) {
    this.commentService.getComments(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any[]) => {
          this.ngZone.run(() => {
            this.comments = data;
            this.cdr.detectChanges();
          });
        },
        error: (err) => { console.error('Error loading comments', err); }
      });
  }

  assignBug() {
    if (!this.bug || this.selectedDeveloperId === null) return;
    this.assigning = true;
    this.bugService.assignBug(this.bug.id, this.selectedDeveloperId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated: Bug) => {
          this.ngZone.run(() => {
            this.bug = updated;
            this.assigning = false;
            this.showNotification('Bug assigned successfully!', 'success');
            this.cdr.detectChanges();
          });
        },
        error: () => {
          this.assigning = false;
          this.showNotification('Failed to assign bug.', 'error');
        }
      });
  }

  addComment() {
    if (!this.newComment.trim() || !this.bug) return;
    this.commentService.addComment(this.bug.id, this.newComment, this.currentUserId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.newComment = '';
          this.loadComments(this.bug!.id);
          this.showNotification('Comment posted!', 'success');
        },
        error: () => { this.showNotification('Failed to post comment.', 'error'); }
      });
  }

  updateStatus() {
    if (!this.bug) return;
    this.bugService.updateStatus(this.bug.id, this.bug.status)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => { this.showNotification('Status updated!', 'success'); },
        error: () => { this.showNotification('Failed to update status.', 'error'); }
      });
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.ngZone.run(() => {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.showToast = false;
        this.cdr.detectChanges();
      }, 3000);
    });
  }
}