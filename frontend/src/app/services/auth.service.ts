import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn:'root'
})
export class AuthService{

API="https://bug-tracking-system-3y60.onrender.com/api/auth"

constructor(private http:HttpClient){}

login(data:any){

return this.http.post(`${this.API}/login`,data)

}

register(data:any){

return this.http.post(`${this.API}/register`,data)

}

}