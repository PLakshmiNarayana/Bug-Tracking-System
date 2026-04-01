import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  toastMessage = '';
  toastType = '';
  showToast = false;

  constructor(private http: HttpClient, private router: Router) {}

  showNotification(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 3000);
  }

  // Decode JWT payload to extract role, email etc.
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (e) {
      return {};
    }
  }

  login() {
    const data = { email: this.email, password: this.password };

    this.http.post<any>('https://bug-tracking-system-3y60.onrender.com/api/auth/login', data)
      .subscribe({
        next: (res) => {
          const token = res.token;
          localStorage.setItem('token', token);

          // Decode JWT to get role and email
          const payload = this.decodeToken(token);
          const role  = payload.role  || payload.roles?.[0]?.replace('ROLE_', '') || '';
          const email = payload.sub   || payload.email || '';
          const name  = payload.name  || email;

          // Fetch full user details (including ID) from backend
          this.http.get<any[]>('https://bug-tracking-system-3y60.onrender.com/api/users', {
            headers: { Authorization: `Bearer ${token}` }
          }).subscribe({
            next: (users) => {
              // Find matching user by email
              const matchedUser = users.find(u => u.email === email);
              const user = matchedUser ?? { name, email, role };
              localStorage.setItem('user', JSON.stringify(user));

              this.showNotification('Login successful! Redirecting...', 'success');
              setTimeout(() => this.router.navigate(['/dashboard']), 1200);
            },
            error: () => {
              // Fallback: store what we have from JWT
              localStorage.setItem('user', JSON.stringify({ name, email, role }));
              this.showNotification('Login successful! Redirecting...', 'success');
              setTimeout(() => this.router.navigate(['/dashboard']), 1200);
            }
          });
        },
        error: () => {
          this.showNotification('Invalid email or password.', 'error');
        }
      });
  }

}