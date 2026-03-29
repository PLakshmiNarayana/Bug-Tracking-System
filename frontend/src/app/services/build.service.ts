import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Build } from '../models/build.model';

@Injectable({ providedIn: 'root' })
export class BuildService {

  private api = 'http://localhost:8080/api/builds';

  constructor(private http: HttpClient) {}

  getBuilds() {
    return this.http.get<Build[]>(this.api);
  }

  // ✅ Fixed: was POST /api/builds, backend expects POST /api/builds/upload
  uploadBuild(formData: FormData) {
    return this.http.post(`${this.api}/upload`, formData);
  }

  // ✅ Download as blob so JWT token is sent via interceptor
  downloadBuild(id: number) {
    return this.http.get(`${this.api}/download/${id}`, {
      responseType: 'blob'
    });
  }

}