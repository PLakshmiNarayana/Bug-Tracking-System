import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;
  loadError = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    const raw = localStorage.getItem('user');
    if (raw && raw !== 'undefined') {
      const cached = JSON.parse(raw);
      if (!cached.id) {
        this.ngZone.run(() => {
          this.user = cached;
          this.cdr.detectChanges();
        });
        return;
      }
    }

    this.userService.getProfile().subscribe({
      next: (data: any) => {
        this.ngZone.run(() => {
          this.user = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error('Error loading profile', err);
          const raw = localStorage.getItem('user');
          if (raw && raw !== 'undefined') {
            this.user = JSON.parse(raw);
          } else {
            this.loadError = true;
          }
          this.cdr.detectChanges();
        });
      }
    });
  }
}