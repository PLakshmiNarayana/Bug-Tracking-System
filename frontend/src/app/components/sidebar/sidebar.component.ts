import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role: string = '';
  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    try {
      const raw = localStorage.getItem('user');
      // Guard against null or the literal string "undefined"
      if (raw && raw !== 'undefined') {
        const parsed = JSON.parse(raw);
        this.role = parsed.role || '';
        this.userName = parsed.name || parsed.username || parsed.email || '';
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