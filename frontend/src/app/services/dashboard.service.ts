import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn:'root'
})
export class DashboardService{

API="https://bug-tracking-system-3y60.onrender.com/api/dashboard"

constructor(private http:HttpClient){}

getStats(){

return this.http.get(this.API)

}

}