import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BugHistoryService {

  // ✅ Fixed: backend is /api/history not /api/bug-history
  private api = 'http://localhost:8080/api/history';

  constructor(private http: HttpClient) {}

  getHistory(bugId: number) {
    return this.http.get<any[]>(`${this.api}/${bugId}`);
  }
}