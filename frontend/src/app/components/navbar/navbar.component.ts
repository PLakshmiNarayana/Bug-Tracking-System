import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Added CommonModule for *ngIf, uppercase pipe
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: string = '';
  userInitial: string = 'U';

  constructor(private router: Router) {}

  ngOnInit() {
    try {
      const raw = localStorage.getItem('user');
      if (raw && raw !== 'undefined') {
        const parsed = JSON.parse(raw);
        this.userName = parsed.name || parsed.username || parsed.email || 'My Account';
        this.userInitial = this.userName.charAt(0).toUpperCase();
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}