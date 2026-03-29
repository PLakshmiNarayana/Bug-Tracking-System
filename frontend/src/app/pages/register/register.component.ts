import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  role = 'TESTER';

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

  register() {
    const data = { name: this.name, email: this.email, password: this.password, role: this.role };

    this.http.post('http://localhost:8080/api/auth/register', data)
      .subscribe({
        next: () => {
          this.showNotification('Account created successfully! Redirecting...', 'success');
          setTimeout(() => this.router.navigate(['/login']), 1200);
        },
        error: () => {
          this.showNotification('Registration failed. Please try again.', 'error');
        }
      });
  }

}