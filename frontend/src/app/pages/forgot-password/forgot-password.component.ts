import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  loading = false;
  submitted = false;
  errorMsg = '';

  private api = 'https://bug-tracking-system-3y60.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  sendResetLink() {
    if (!this.email) {
      this.errorMsg = 'Please enter your email';
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    this.http.post(`${this.api}/forgot-password`, { email: this.email }).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Something went wrong';
        this.loading = false;
      }
    });
  }
}