import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bug } from '../models/bug.model';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  private api = "http://localhost:8080/api/bugs";

  constructor(private http: HttpClient) {}

  getAllBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.api);
  }

  getBugById(id: number): Observable<Bug> {
    return this.http.get<Bug>(`${this.api}/${id}`);
  }

  createBug(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  // ✅ Fixed: backend uses /developer/{developerId} with @RequestParam
  getAssignedBugs(): Observable<Bug[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const developerId = user.id;
    return this.http.get<Bug[]>(`${this.api}/developer/${developerId}`);
  }

  // ✅ Fixed: backend uses @RequestParam so send as query param
  updateStatus(id: number, status: string) {
    return this.http.put(`${this.api}/${id}/status?status=${status}`, null);
  }

  uploadScreenshot(id: number, file: FormData): Observable<any> {
    return this.http.post(`${this.api}/${id}/upload`, file);
  }

  assignBug(bugId: number, developerId: number): Observable<Bug> {
    return this.http.put<Bug>(`${this.api}/${bugId}/assign/${developerId}`, null);
  }

  searchBugs(keyword: string): Observable<Bug[]> {
    return this.http.get<Bug[]>(`${this.api}/search?keyword=${keyword}`);
  }

}