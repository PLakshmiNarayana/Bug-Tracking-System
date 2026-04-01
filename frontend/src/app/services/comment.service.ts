import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommentService {

  private api = 'https://bug-tracking-system-3y60.onrender.com/api/comments';

  constructor(private http: HttpClient) {}

  // ✅ Fixed: was /api/comments/{bugId} → /api/comments/bug/{bugId}
  getComments(bugId: number) {
    return this.http.get<any[]>(`${this.api}/bug/${bugId}`);
  }

  // ✅ Fixed: backend expects { bug: { id }, user: { id }, message }
  addComment(bugId: number, message: string, userId: number) {
    const body = {
      bug: { id: bugId },
      user: { id: userId },
      message: message
    };
    return this.http.post<any>(this.api, body);
  }

}