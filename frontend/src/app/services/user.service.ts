import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) {}

  // ✅ Fixed: /me doesn't exist — fetch by ID from localStorage
  getProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const id = user.id;
    return this.http.get(`${this.api}/${id}`);
  }

  getAllUsers() {
    return this.http.get<any[]>(this.api);
  }

}